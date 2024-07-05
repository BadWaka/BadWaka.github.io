
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
// console.log('process.env', process.env);

// 用于生成和验证 JWT 的密钥
const SECRET_KEY = 'badwaka';

// 中间件，用于解析 JSON 请求体
app.use(bodyParser.json());


