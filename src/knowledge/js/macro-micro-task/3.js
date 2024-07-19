
new Promise((resolve, reject) => {
    console.log(1);
    new Promise((resolve, reject) => {
        console.log(2);
        setTimeout(() => {
            resolve(3)
            console.log(4)
        });
    }).then(data => {
        setTimeout(() => {
            console.log(5);
        });
        console.log(data);
    })
    setTimeout(() => {
        resolve(6)
        console.log(7)
    });
}).then(data => {
    console.log(data);
    setTimeout(() => {
        console.log(8);
    });
    console.log(9);
})
