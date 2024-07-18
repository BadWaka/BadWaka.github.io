
new Promise(resolve => {
    console.log(777);
    resolve();
}).then(() => {
    console.log(888);
});

console.log(999);
