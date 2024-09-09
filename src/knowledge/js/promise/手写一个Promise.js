
class MyPromise {

    // executor 是传入的函数
    constructor(executor) {
        // 设置初始状态为 pending
        this.state = 'pending';
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;
        // 成功回调函数列表
        this.onFullfilledCbs = [];
        // 失败回调函数列表
        this.onRejectedCbs = [];

        // resolve 方法
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.value = value;
                this.state = 'fullfilled';
                this.onFullfilledCbs.forEach(cb => {
                    cb(this.value);
                });
            }
        };

        // reject 方法
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.reason = reason;
                this.state = 'rejected';
                this.onRejectedCbs.forEach(cb => {
                    cb(this.reason);
                });
            }
        };

        try {
            executor(resolve, reject);
        }
        catch (error) {
            reject(error);
        }
    }

    then(onFullfilled, onRejected = reason => { throw reason }) {

        return new MyPromise((resolve, reject) => {

            if (this.state === 'fullfilled') {
                setTimeout(() => {
                    const res = onFullfilled(this.value);
                    resolve(res);
                }, 0);
            }

            if (this.state === 'rejected') {
                setTimeout(() => {
                    const res = onRejected(this.reason);
                    resolve(res);
                }, 0);
            }

            if (this.state === 'pending') {
                this.onFullfilledCbs.push((value) => {
                    setTimeout(() => {
                        onFullfilled(value);
                    }, 0);
                });
                this.onRejectedCbs.push((reason) => {
                    setTimeout(() => {
                        onRejected(reason);
                    }, 0);
                });
            }
        });
    }

}

const p = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
    //     reject('超时错误');
    // }, 500);
    setTimeout(() => {
        resolve('success');
    }, 1000);
});

p.then(data => {
    console.log('p then data', data);
}, error => {
    console.log('error', error);
}).then(data2 => {
    console.log('p then data2', data2);
});
