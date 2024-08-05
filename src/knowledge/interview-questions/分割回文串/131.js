
/**
 * @returns
 */

import {
    inspect
} from 'util';

function log(obj) {
    console.log(inspect(obj, {
        depth: null,
        colors: true
    }));
}

// 是否是回文
function isPalinedrome(s) {
    return s === s.split('').reverse().join('');
}
// console.log(isPalinedrome('ef'));

function partition(s) {
    const arr = [];
    function dfs(start, path) {
        console.log('start', start);
        if (start === s.length) {
            arr.push(path);
            return;
        }
        for (let i = start + 1; i <= s.length; i++) {
            const str = s.substring(start, i);
            console.log('str', str);
            // 判断是否是回文
            if (isPalinedrome(str)) {
                path.push(str);
                dfs(i, [...path]);
                path.pop();
            }
        }
    }
    dfs(0, []);
    return arr;
}

/**
 * 这个函数比较复杂
 * 可以不管原字符串的字符顺序
 * 排列出所有可能性
 * leetcode 的题目出的有歧义
 * 它并没有说不能修改原字符串的字符顺序
 */
function partition3(s) {
    // 首先排序，让相同字符都挨在一起
    // s = s.split('').sort().join('');
    // map 里统计每个字符的出现次数
    const map = {};
    for (let i = 0; i < s.length; i++) {
        if (!map[s[i]]) {
            map[s[i]] = {
                count: 1
            };
            continue;
        }
        map[s[i]].count++;
    }
    // console.log('map', map);

    const arrList = [];
    const fArr = [];
    Object.keys(map).forEach(char => {
        let tempS = '';
        for (let i = 0; i < map[char].count; i++) {
            tempS += char + '';
        }
        console.log('tempS', tempS);
        let arr = travel(tempS);
        arrList.push(arr);
        // console.log('arr', arr);
        map[char].arr = arr;
    });
    // log(map);
    log(arrList);

    const mockArrList = [
        [ [ 'a', 'a' ], [ 'aa' ] ],
        [ [ 'b' ] ]
    ];

    while(arrList.length > 1) {
        const newArr = [];
        const last1 = arrList[arrList.length - 1];
        const last2 = arrList[arrList.length - 2];
        for (let i = 0; i < last1.length; i++) {
            for (let j = 0; j < last2.length; j++) {
                newArr.push(last2[j].concat(last1[i]));
            }
        }
        arrList.pop();
        arrList[arrList.length - 1] = newArr;
        console.log('arrList', arrList);
    }

    return arrList[0];
}

function travel(s) {
    if (!s) {
        return [];
    }
    if (s.length === 1) {
        return [[s]];
    }
    const fArr = [];
    // 优化；去重用
    const map = {};
    for (let i = 0; i < s.length; i++) {
        const arr = [];
        const left = s.slice(0, i) + '' + s[i];
        const right = s.slice(i + 1);
        // console.log('\nleft', left, 'right', right);
        arr.push(left);
        if (i < s.length - 1) {
            const res = travel(s.slice(i + 1));
            res.forEach(item => {
                // console.log('item', item);
                let newArr = arr.concat(item).sort();
                if (!map[newArr.join(',')]) {
                    map[newArr.join(',')] = true;
                    fArr.push(newArr);
                }
            });
        }
        else {
            if (!map[arr.join(',')]) {
                map[arr.join(',')] = true;
                fArr.push(arr);
            }
        }
    }
    return fArr;
}

function partition2(s) {
    if (!s) {
        return [];
    }
    if (s.length === 1) {
        return [[s]];
    }

    // map 里统计每个字符的出现次数
    const map = {};

    // 全部是单字符的方案
    // const singleArr = [];

    for (let i = 0; i < s.length; i++) {
        // singleArr.push(s[i]);
        if (!map[s[i]]) {
            map[s[i]] = 1;
            continue;
        }
        map[s[i]]++;
    }
    console.log('map', map);

    const finalArr = [];
    // finalArr.push(singleArr);

    Object.keys(map).forEach(key => {
        // 有重复的字符
        if (map[key] > 1) {
            // 找到其他字符
        }
    });

    return finalArr;
}

// 找到没有特定字符的字符串，
function findStrArrWithoutChar(char, str) {

}

let params = 'aab';
// params = 'abbabb';
params = 'efe';
const res = partition(params);
console.log('\nres', res);
