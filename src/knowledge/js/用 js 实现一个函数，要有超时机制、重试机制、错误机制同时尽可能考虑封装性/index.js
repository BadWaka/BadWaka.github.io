
async function req(fn, opts = {}) {
    const {
        retrytimes = 3,
        timeout = 5000,
        onRetry = null
    } = opts;

    function reqWithTimeout() {
        return new Promise((resolve, reject) => {
            const timeoutHandler = setTimeout(() => {
                reject(new Error('超时'));
            }, timeout);
            fn()
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    clearTimeout(timeoutHandler);
                });
        });
    }

    let attemptCount = 0;

    while (attemptCount < retrytimes) {
        attemptCount++;
        try {
            const res = await reqWithTimeout();
            return res;
        }
        catch(e) {
            if (attemptCount > retrytimes) {
                throw e;
            }
            // 调用重试回调
            if (onRetry) {
                onRetry(attemptCount, e);
            }
        }
    }

}

/**
 * 测试代码
 */

async function exampleRequest() {
    // 模拟一个可能会失败的异步操作
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // if (Math.random() > 0.5) {
            //     resolve('成功');
            // } else {
                reject(new Error('请求失败'));
            // }
        }, 1000);
    });
}

async function main() {
    try {
        const result = await req(exampleRequest, {
            retrytimes: 3,
            timeout: 2000,
            onRetry: (attempt, error) => {
                console.log(`第 ${attempt} 次重试...`, error ? `错误: ${error.message}` : '');
            }
        });
        console.log('最终结果:', result);
    } catch (e) {
        console.error('请求最终失败:', e);
    }
}

main();
