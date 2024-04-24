/**
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = function(prices) {
    let max = 0;
    // 我先买一下，反正如果一开始就降价了我就直接卖掉，不亏
    let min = prices[0];
    // 上一项
    let lastItem = prices[0];
    // 斜率；或者说变化趋势；1 表示增长或持平；-1 表示降低
    let a = 1;
    let increaseCount = 0; // 增长次数
    let reduceCount = 0; // 降低次数
    // 总利润
    let profitTotal = 0;
    // 第一次不用循环
    for (let i = 1; i < prices.length; i++) {
        const cur = prices[i];
        // 利润
        let profit = 0;
        // 记录上一次的 a
        const lastA = a;
        // 如果相等也认为增长
        if (cur >= lastItem) {
            a = 1;
            // 如果它一直涨，max 就一直更新
            max = cur;
            increaseCount++;
        }
        else if (cur < lastItem) {
            a = -1;
            reduceCount++;
        }

        console.log('cur', cur, 'lastItem', lastItem, 'lastA', lastA, 'a', a);

        // 从 -1 变为 1，则认为已达到相对低点，需要买入
        if (lastA === -1 && a === 1) {
            // 后知后觉
            min = lastItem;
            console.log('买入 min', min);
        }
        // 从 1 变为 -1，则认为已达到相对高点，需要卖出
        else if (
            lastA === 1 && a === -1
            // 得买了才能卖出
            // 0 的时候居然也能买！Damn!
            // && min !== 0
        ) {
            max = lastItem;
            console.log('卖出 max', max, 'min', min);

            profit = max - min;
            profitTotal += profit;

            max = 0;
            min = 0;
        }

        lastItem = cur;

    }

    // 如果 max 和 min 还有值，那就是买了以后一直涨一直没卖出
    if (max) {
        // 再卖出一次
        profitTotal += max - min;
    }

    console.log('max', max, 'min', min, 'increaseCount', increaseCount, 'reduceCount', reduceCount);

    // 全增长，递增数列
    if (increaseCount === prices.length - 1) {
        // 买第一个
        min = prices[0];
        // 卖最后一个
        max = prices[prices.length - 1];
        profitTotal = max - min;
    }

    return profitTotal;
};

// const array = [7,1,5,3,6,4];
// const array = [1,2,3,4,5];
// const array = [6,1,3,2,4,7];
// const array = [1,4,2];
const array = [2,1,2,0,1];
const res = maxProfit(array);
console.log('res', res);
