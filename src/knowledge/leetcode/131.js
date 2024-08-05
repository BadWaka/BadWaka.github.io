
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

function partition(s) {
    // 首先排序，让相同字符都挨在一起
    s = s.split('').sort().join('');
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
const res = partition(params);
console.log('\nres', res);
