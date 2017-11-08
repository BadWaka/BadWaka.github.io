const axios = require('axios');
const fs = require('fs');
const console = require('tracer').colorConsole(); // 增强console

const uaPC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';
const uaMobile = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';

axios.get('http://www.baidu.com')
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });

axios({
    method: 'get',
    url: 'http://www.baidu.com',
    headers: {
        'User-Agent': uaPC
    }
}).then((res) => {
    fs.writeFile('baidu_pc.html', res.data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.info('ok.');
        }
    });
});

