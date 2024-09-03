
export default class MyPlugin {
    constructor(options) {
        console.log('my-plugin constructor options', options);
        this.options = options;
    }

    apply(compiler) {
        console.log('my-plugin apply compiler');
    }
}
