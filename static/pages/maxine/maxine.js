window.onload = function () {
    var vm = new Vue({
        el: '#page',
        data: {
            headerImg: 'http://img.hb.aicdn.com/44d7e4a4a4f65e93421a0eb8292b0c17bd63d2e7544b3-xqXKft_fw6' +
                    '58',
            tabs: [
                {
                    text: 'MAIN'
                }, {
                    text: 'HISTORY'
                }, {
                    text: 'MENU'
                }, {
                    text: 'NEWS'
                }, {
                    text: 'LOCATION'
                }, {
                    text: 'CONTACT'
                }
            ]
        }
    });
}