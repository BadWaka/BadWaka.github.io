
/**
 * @file 获得文章数据
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);

// 获取当前文件所在的目录
const __dirname = path.dirname(__filename);

/**
 * 找到 markdown 文件
 *
 * @param {string} dir 文件夹路径
 * @returns
 */
async function findMarkdownFiles(dir) {
    let files = [];
    try {
        const items = await fs.readdir(dir, { withFileTypes: true });
        for (let item of items) {
            const fullPath = path.resolve(dir, item.name);
            if (item.isDirectory()) {
                files = files.concat(await findMarkdownFiles(fullPath));
            }
            else if (item.name.endsWith('.md')) {
                files.push(fullPath);
            }
        }
    }
    catch (err) {
        console.error('Error reading directory:', err);
    }
    return files;
}

/**
 * 读取 Markdown 文件并提取标题
 *
 * @param {string} filePath 文件路径
 * @returns
 */
async function readMarkdownFile(filePath) {
    try {
        const dirname = path.dirname(filePath);
        const basename = path.basename(filePath);
        const lastDir = path.basename(dirname);
        console.log('basename', basename);
        const content = await fs.readFile(filePath, 'utf8');
        const match = content.match(/^# (.*)/m); // 正则表达式匹配 Markdown 标题
        return {
            path: filePath,
            title: match ? match[1] : '',
            content: content,
            type: lastDir,
            fileName: basename
        };
    }
    catch (err) {
        console.error('Error reading file:', filePath, err);
        return null;
    }
}

/**
 * 把 JSON 写入文件里
 *
 * @param {Object} data JSON 对象
 * @param {string} filePath 写入的文件路径
 */
async function writeJsonToFile(data, filePath) {
    console.log('data', data, 'filePath', filePath);
    try {
        // 将对象转换为 JSON 字符串
        const jsonData = JSON.stringify(data, null, 2); // 第二个参数为 null, 第三个参数为 2，用于美化输出格式
        // 异步写入文件
        await fs.writeFile(filePath, jsonData, 'utf8');
        console.log('JSON data has been successfully written to file.');
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}

async function main() {
    const directoryPath = path.join(__dirname, '../../src/articles');
    const markdownFiles = await findMarkdownFiles(directoryPath);
    console.log('markdown 文件列表', markdownFiles);

    const articles = [];
    for (const file of markdownFiles) {
        const fileData = await readMarkdownFile(file);
        articles.push(fileData);
    }

    writeJsonToFile(articles, path.join(__dirname, '../../public/articles.json'));
}

main();
