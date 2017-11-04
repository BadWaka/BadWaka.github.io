// 身份证号码
let identityCardArr = [
    '410728198905041577',
    '410728198905041576',
    '410728198905041575',
];
// 权重数组
const weightArray = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
// z -> m 映射表
const mapZM = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

/**
 * 计算
 * @param {*} identityCard 
 */
function calculate(identityCard) {
    let lastStr = identityCard[identityCard.length - 1];
    let z = 0;
    let m = '';
    // 加权求和
    for (let i = 0; i < 17; i++) {
        // 将字符串转化为整数，加权求和，得到 z
        let tmp = parseInt(identityCard[i]) * weightArray[i];
        z += tmp;
    }
    z = z % 11;
    // z -> m 映射
    m = mapZM[z];
    return {
        isTure: m === lastStr,
        identityCard
    }
}

// 错误列表
let errorList = [];
identityCardArr.forEach(function (item) {
    let result = calculate(item);
    console.log('result', result);
    if (!result.isTure) {
        errorList.push(result.identityCard);
    }
});
console.log('最后结果: ', errorList);