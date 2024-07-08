
/**
 * 求交集
 *
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
function getIntersection(arr1, arr2) {
    const intersectionArr = [];
    const map2 = {};
    for (let i = 0; i < arr2.length; i++) {
        map2[arr2[i]] = (map2[arr2[i]] || 0) + 1;
    }
    for (let i = 0; i < arr1.length; i++) {
        // indexOf 本身时间复杂度也是 O(n)，整体复杂度就是 O(n^2)，太高了；改为 hash map
        // if (arr2.indexOf(arr1[i]) !== -1) {
        //     intersectionArr.push(arr1[i]);
        // }
        if (map2[arr1[i]] > 0) {
            intersectionArr.push(arr1[i]);
        }
    }
    return intersectionArr;
}

/**
 * 求并集
 *
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
function getUnion(arr1, arr2) {
    let unionArr = [];

    // 第一种方法，先 concat 再数组去重
    // unionArr = arr1.concat(arr2);
    // // 数组去重也是用 map
    // return unionArr;

    // 第二种方法，先放 map 里，再遍历 map
    const map = {};
    for (let i = 0; i < arr1.length; i++) {
        map[arr1[i]] = (map[arr1[i]] || 0) + 1;
    }
    for (let i = 0; i < arr2.length; i++) {
        map[arr2[i]] = (map[arr2[i]] || 0) + 1;
    }
    // console.log('map', map);
    return Object.keys(map).map(item => parseInt(item, 10));
}

let arr1 = [0,1,2,3];
let arr2 = [0,1,4,5,6,7,8];

const intersectionArr = getIntersection(arr1, arr2);
console.log('intersectionArr', intersectionArr);

const unionArr = getUnion(arr1, arr2);
console.log('unionArr', unionArr);
