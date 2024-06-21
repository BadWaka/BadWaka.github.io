
/**
 * @file 自定义 schema
 */
import { Schema } from 'prosemirror-model';

export const schema = new Schema({
    nodes: {
        // 主文档
        doc: {
            content: 'block+'
        },
        // 段落
        paragraph: {
            content: 'inline*',
            group: 'block',
            parseDOM: [
                {
                    tag: 'p'
                }
            ],
            toDOM() {
                return [
                    'p',
                    0
                ];
            }
        },
        // 文本
        text: {
            group: 'inline'
        },
        // 1-6 级标题
        heading: {
            attrs: {
                level: {
                    default: 1
                }
            },
            content: 'inline*',
            group: 'block',
            // defining: 特殊属性，为 true 代表如果在当前标签内（以 h1 为例），全选内容，直接粘贴新的内容后，这些内容还会被 h1 标签包裹
            // 如果为 false, 整个 h1 标签（包括内容与标签本身）将会被替换为其他内容，删除亦如此。
            defining: true,
            toDOM(node) {
                const tag = `h${node.attrs.level}`;
                return [tag, 0];
            },
            parseDOM: [
                { tag: "h1", attrs: { level: 1 } },
                { tag: "h2", attrs: { level: 2 } },
                { tag: "h3", attrs: { level: 3 } },
                { tag: "h4", attrs: { level: 4 } },
                { tag: "h5", attrs: { level: 5 } },
                { tag: "h6", attrs: { level: 6 } }
            ]
        },
        // 列表项
        list_item: {
            content: 'paragraph block*',
            defining: true,
            parseDOM: [
                {
                    tag: 'li'
                }
            ],
            toDOM() {
                return ['li', 0];
            }
        },
        // 无序列表
        bullet_list: {
            content: 'list_item+',
            group: 'block',
            parseDOM: [
                {
                    tag: 'ul'
                }
            ],
            toDOM() {
                return ['ul', 0];
            }
        },
        // 有序列表
        ordered_list: {
            content: 'list_item+',
            group: 'block',
            attrs: {
                order: {
                    default: 1
                }
            },
            parseDOM: [
                {
                    tag: 'ol',
                    getAttrs(dom) {
                        return {
                            order: dom.hasAttribute('start')
                                ? parseInt(dom.getAttribute('start') || '1', 10)
                                : 1
                        };
                    }
                }
            ],
            toDOM(node) {
                return node.attrs.order === 1
                    ? [
                        'ol',
                        0
                    ]
                    : [
                        'ol',
                        {
                            start: node.attrs.order
                        },
                        0
                    ];
            }
        }
    },
    marks: {
        // 粗体
        bold: {
            parseDOM: [
                {
                    tag: 'span.bold'
                },
                {
                    tag: 'strong'
                }
            ],
            toDOM() {
                return [
                    'span',
                    {
                        class: 'bold'
                    },
                    0
                ]
            }
        },
        // 斜体
        italic: {
            parseDOM: [
                {
                    tag: 'span.italic'
                }
            ],
            toDOM() {
                return [
                    'span',
                    {
                        class: 'italic'
                    },
                    0
                ]
            }
        }
    }
});
