
function getUrlParams(url) {
    const regExp = /\?(.*)#/;
    const res = url.match(regExp);
    console.log('res', res);
}

const url = 'https://panda.baidu-int.com/llm?appId=gpt-4o&b=123&c=456#hook';
const res = getUrlParams(url);
