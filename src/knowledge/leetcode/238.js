
/**
 * @returns
 */
function f(nums) {
    let list = [];
    for (let i = 0; i < nums.length; i++) {
        const product = getProduct(nums, i);
        list.push(product);
    }
    return list;
}

function getProduct(nums, exceptIndex) {
    if (nums.length < 1) {
        return 0;
    }
    let product = 1;
    for (let i = 0; i < nums.length; i++) {
        if (i === exceptIndex) {
            continue;
        }
        product = product * nums[i];
    }
    return product;
}

let params = [1,2,3,4];
const res = f(params);
console.log('res', res);
