
import {
    log
} from '../../../algorithm/util.js';

/**
 * 思路：
 * 如果能修改原链表的话，先遍历一遍链表，给他们每个都附上一个索引 index（从 0 开始）；
 * 再遍历一遍链表，首先先找 node.sibling 对应的 node 的 index，作为当前 node 的 sIndex；然后每个节点都新建一个 node，val 和 sIndex 都赋值上，然后放进一个数组 arr 里
 * 遍历这个数组，每项 arr[i] 的 next 指向 arr[i + 1]，每项 arr[i] 的 sibling 指向 arr[arr[i].sIndex]
 * 就完事了
 */
