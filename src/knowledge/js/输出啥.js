const f1 = async () => {
    return 1;
};
const f2 = async () => {
    return Promise.resolve(2);
};
console.log(typeof f1());
console.log(typeof f1() === typeof f2());