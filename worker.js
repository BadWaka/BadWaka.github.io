
console.log('worker.js');

self.addEventListener('error', err => {
    console.log(err.message);
});

self.addEventListener('messageerror', err => {
    console.log(err.message);
});

self.addEventListener('message', e => {
    console.log('worker e', e);
});

self.postMessage('holyshit');

// 关闭
self.close();
