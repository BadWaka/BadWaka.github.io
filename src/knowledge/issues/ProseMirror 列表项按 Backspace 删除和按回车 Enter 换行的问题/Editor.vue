<template>
    <div class="wrapper">
        <div class="layout mb20">
            <div>node 操作：</div>
            <button @mousedown.prevent="toggleBulletList">无序列表</button>
            <button @mousedown.prevent="toggleOrderedList">有序列表</button>
            <button @mousedown.prevent="insertParagraph">插入段落</button>
        </div>
        <div class="layout mb20">
            <div>mark 操作：</div>
            <button @mousedown.prevent="toggleBold">加粗</button>
            <button @mousedown.prevent="toggleItalic">斜体</button>
        </div>
        <Selection/>
        <div ref="editor" class="editor">
            <p style="display: none">测试文本德玛西亚 诺克萨斯 艾欧尼亚</p>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue';

import { EditorState, Plugin } from 'prosemirror-state'; // State
import { EditorView } from 'prosemirror-view'; // View
import { DOMParser } from 'prosemirror-model'; // Model
import { keymap } from 'prosemirror-keymap'; // 键盘映射
import {
    baseKeymap, // 基础键盘映射
    toggleMark // 开关 mark
} from 'prosemirror-commands'; // 指令
import {
    wrapInList, // 包裹成列表
    liftListItem, // 列表项提升
    splitListItem, // 列表项分离
    sinkListItem // 列表项降级
} from 'prosemirror-schema-list'; // 列表
import {
    undoInputRule,
    inputRules, // 输入规则
    wrappingInputRule // 把正则包裹为输入规则
} from 'prosemirror-inputrules'; // 输入规则
import { history, undo, redo } from 'prosemirror-history'; // 历史

import { findParentNodeOfType } from './util';

// 自定义 schema
import { schema } from './schema';

import Selection from './Selection.vue';

// editor DOM
const editor = ref(null);

// 是否获得焦点
const isFocus = ref(false);

// editor view
let view = null;

// 输入规则插件
const inputRulesPlugin = inputRules({
    rules: [
        // 无序列表
        wrappingInputRule(/^\s*-\s$/, schema.nodes.bullet_list),
        // 有序列表
        wrappingInputRule(/^(\d+)\.\s$/, schema.nodes.ordered_list)
    ]
});

// 键盘映射插件
const keymapPlugin = keymap({
    'Enter': (state, dispatch) => {
        // 判断当前选区是否是列表项
        const listItem = findParentNodeOfType(state.schema.nodes.list_item)(state.selection);
        console.log('Enter', 'listItem', listItem);

        // 当前选区是否是列表项
        if (listItem) {
            // console.log('列表项');

            // 空列表项
            if (listItem.node.content.size === 2) {
                // console.log('Enter 空列表项');

                // 如果当前光标前是一个空的列表项，则尝试提升（lift）列表项
                if (liftListItem(state.schema.nodes.list_item)(state, dispatch)) {
                    return true;
                }

                return false;
            }

            // 非空列表项
            // console.log('Enter 非空列表项');
            // 列表项拆分
            if (splitListItem(schema.nodes.list_item)(state, dispatch)) {
                return true;
            }
        }

        return false;
    },
    'Tab': (state, dispatch) => {
        // 尝试缩进列表项
        if (sinkListItem(schema.nodes.list_item)(state, dispatch)) {
            return true;
        }
        // 屏蔽 Tab 默认操作
        return true;
    },
    'Shift-Tab': liftListItem(schema.nodes.list_item),
    'Backspace': (state, dispatch) => {

        // 判断当前选区是否是列表项
        const listItem = findParentNodeOfType(state.schema.nodes.list_item)(state.selection);
        console.log('Backspace', 'listItem', listItem);

        const {
            // 获取光标对象
            $cursor
        } = state.selection;
        console.log('$cursor', $cursor);

        // 异常情况容错
        if (
            !$cursor
            || $cursor.pos === 0
        ) {
            return false;
        }

        // console.log('$cursor.parent.type.name', $cursor.parent.type.name);
        // console.log('$cursor.parent.content', $cursor.parent.content);

        /**
         * 对于在空的段落或者空的列表项起始位置按 Backspace 键的处理
         */
        if (
            // 如果当前光标位置的节点类型为 paragraph
            $cursor.parent.type.name === 'paragraph'
            // 并且这个 paragraph 是空的
            && $cursor.parent.content.size === 0
        ) {
            // 当前光标的前一个位置
            const beforePos = $cursor.pos - 1;
            // 前一个位置的节点
            const beforeNode = state.doc.resolve(beforePos);
            // console.log('beforePos', beforePos);
            // console.log('beforeNode', beforeNode);

            /**
             * 解决删除列表项时，如果前一项也还是列表项，无法将列表项删除至顶格的问题
             */
            if (
                // 如果 beforeNode.nodeBefore 为空
                !beforeNode.nodeBefore
            ) {
                console.log('删除空列表项');

                // 如果当前光标前是一个空的列表项，则尝试提升（lift）列表项
                const res = liftListItem(state.schema.nodes.list_item)(state, dispatch);
                console.log('res', res);
                if (res) {
                    return true;
                }
            }

            /**
             * 解决对空的列表项按回车后，再按 Backspace 删除当前空行，如果前一行还是列表项，则无法正确删除当前行的问题
             */
            if (
                // 前一个位置节点的前一个节点存在
                beforeNode.nodeBefore
                // 前一个位置节点的前一个节点的类型为 bullet_list 无序列表 或 ordered_list 有序列表
                && (
                    beforeNode.nodeBefore.type.name === 'bullet_list'
                    || beforeNode.nodeBefore.type.name === 'ordered_list'
                )
            ) {
                // 空段落的位置
                const emptyParaPos = $cursor.pos - $cursor.parent.nodeSize;
                // console.log('emptyParaPos', emptyParaPos, '$cursor.pos', $cursor.pos, '$cursor.parent.nodeSize', $cursor.parent.nodeSize);

                // 删除空段落
                const tr = state.tr.delete(emptyParaPos, $cursor.pos);
                dispatch(tr);

                // 屏蔽后续默认操作
                return true;
            }
        }
    }
});

// 焦点插件
const focusPlugin = new Plugin({
    props: {
        handleDOMEvents: {
            focus: (view, event) => {
                // console.log('编辑器获得焦点');
                isFocus.value = true;
                return false;
            },
            blur: (view, event) => {
                // console.log('编辑器失去焦点');
                isFocus.value = false;
                // 返回 false 表示这个事件不会阻止事件的默认行为
                return false;
            }
        }
    }
});

/**
 * 初始化编辑器
 */
const initEditor = () => {

    const state = EditorState.create({
        doc: DOMParser.fromSchema(schema).parse(editor.value),
        plugins: [
            // 键盘映射插件，用来处理列表换行
            keymapPlugin,
            // 键盘映射插件，处理基本键盘输入
            keymap(baseKeymap),
            // 焦点插件
            focusPlugin,
            // 输入规则插件
            inputRulesPlugin,
            // 历史
            history(),
            // 历史快捷键
            keymap({
                'Mod-z': undo,
                'Mod-Shift-z': redo,
                'Mod-y': redo
            })
        ]
    });

    view = new EditorView(editor.value, {
        state,
        // dispatchTransaction(transaction) {
        //     const newState = view.state.apply(transaction);
        //     view.updateState(newState);
        // }
    });

    window.view = view;

};

/**
 * Marks
 */

// 切换粗体
const toggleBold = () => {
    console.log('toggleBold');
    toggleMarkType(schema.marks.bold);
};

// 切换斜体
const toggleItalic = () => {
    console.log('toggleItalic');
    toggleMarkType(schema.marks.italic);
};

// 切换 mark 类型
const toggleMarkType = (markType) => {
    const {
        state,
        dispatch
    } = view;
    const {
        $from,
        $to,
        empty
    } = state.selection;
    console.log('from', $from, 'to', $to, 'empty', empty);

    // 如果选区为空，直接返回
    if (empty) {
        return;
    }

    // 重新设置选区，不顶用；逻辑上选区还在，但是视图上没有
    // tr = tr.setSelection(TextSelection.create(tr.doc, from, to));

    // 重新设置焦点，会闪一下
    // view.focus();

    toggleMark(markType)(state, dispatch);
};

/**
 * Nodes
 */

// 切换无序列表
const toggleBulletList = () => {
    const {
        bullet_list,
        list_item
    } = view.state.schema.nodes;

    // 如果没有获得焦点，直接 return
    if (!isFocus.value) {
        return;
    }

    // 判断选区父 node 有没有无序列表 bullet_list
    let parentList = findParentNodeOfType(bullet_list)(view.state.selection);
    console.log('parentList', parentList);

    // 如果有，就重新变回 paragraph
    if (parentList) {
        liftListItem(list_item)(view.state, view.dispatch);
        return;
    }

    // 如果没有，变成 bullet_list
    wrapInList(bullet_list)(view.state, view.dispatch);

};

// 切换有序列表
const toggleOrderedList = () => {
    const {
        ordered_list,
        list_item
    } = view.state.schema.nodes;

    // 如果没有获得焦点，直接 return
    if (!isFocus.value) {
        return;
    }

    let parentList = findParentNodeOfType(ordered_list)(view.state.selection);
    console.log('parentList', parentList);

    // 如果有，就重新变回 paragraph
    if (parentList) {
        liftListItem(list_item)(view.state, view.dispatch);
        return;
    }

    // 如果没有，变成 ordered_list
    wrapInList(ordered_list)(view.state, view.dispatch);

};

// 插入段落
const insertParagraph = (content = '测试文案') => {
    const {
        state,
        dispatch
    } = view;
};

// 在 mounted 里才能拿到 DOM 实例
onMounted(() => {
    initEditor();
});

onBeforeUnmount(() => {
    if (view) {
        view.destroy();
        view = null;
    }
});

</script>

<style lang="less" scoped>
.wrapper {
    padding: 20px;
}

.mb20 {
    margin-bottom: 20px;
}

.layout {
    display: flex;
    align-items: center;

    button {
        margin-right: 10px;
    }
}

.editor-wrapper {}
</style>

<style lang="less">
.editor {
    .bold {
        font-weight: bold;
    }

    .italic {
        font-style: italic;
    }
}

// 选区颜色
.ProseMirror ::selection {
    background: lightblue;
}

// Firefox 兼容
.ProseMirror::-moz-selection {
    background: lightblue;
}
</style>
