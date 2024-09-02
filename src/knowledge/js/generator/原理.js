// function* foo() {
//     yield 'result1'
//     yield 'result2'
//     yield 'result3'
// }

// const gen = foo()
// console.log(gen.next()) //{value: "result1", done: false}
// console.log(gen.next()) //{value: "result2", done: false}
// console.log(gen.next()) //{value: "result3", done: false}
// console.log(gen.next()) //{value: undefined, done: true}

// function gen$(nextStep) {
//     while (1) {
//         switch (nextStep) {
//             case 1:
//                 return 'result1';
//             case 2:
//                 return 'result2';
//             case 3:
//                 return 'result3';
//             case 6:
//                 return undefined;
//         }
//     }
// }

function gen() {
    let nextStep = 1;
    return function () {
        switch (nextStep) {
            case 1:
                nextStep++;
                return 'result1';
            case 2:
                nextStep++;
                return 'result2';
            case 3:
                nextStep++;
                return 'result3';
            case 4:
                return undefined;
        }
    };
}

let a = gen();
console.log(a());
console.log(a());
console.log(a());
console.log(a());
