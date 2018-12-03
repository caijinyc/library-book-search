const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'lovegcc1212',
    database: 'library_books_info' // 数据库
});

const app = express();

app.get('/searchname', getSearchName);
app.get('/booknum', getBookNum);
app.listen(3000);

/**
 * 思路：
 * 1. 解析 Get 请求，如： /searchname?bookname="屠龙宝刀"
 * 2. 获得 bookname "屠龙宝刀" （bookname 通过书名检索， authorname 通过作者检索）
 * 3. 检索数据库，将合适的书籍组成数组返回
 *      如果没有合适的就返回空数组
 * 4. 前端展示检索列表（最多显示 10 本书籍）
 * 5. 点击书名，通过 num 书籍 id 发起 Get 请求，如：/boonum?num=123456
 * 6. 通过 id 获取书籍详细信息
 */

function getSearchName (req, res) {
    res.set('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    let name = null, searchType = null;
    if (req.query.bookname && req.query.bookname !== '') {
        // 当数据为 bookname 时，检索书籍名称
        name = req.query.bookname;
        searchType = 'series';
    } else if (req.query.authorname && req.query.bookname !== '') {
        // 当数据为 authorname 时，检索作者
        name = req.query.authorname;
        searchType = 'publisher';
    } else {
        // 都没有就返回空数组
        res.send([]);
        return;
    }
    const sql = `SELECT num,series,publisher,bookman FROM hellomysql WHERE ${searchType} like '%${name}%' ORDER BY num DESC LIMIT 0, 10;`;
    db.query(sql, function(err, result) {
        res.send(result);
    });
}

function getBookNum (req, res) {
    let num = req.query.num;
    const sql = `SELECT * FROM hellomysql WHERE num = ${num};`;
    db.query(sql, function(err, result) {
        res.header('Access-Control-Allow-Origin', '*');
        res.set('Content-Type', 'application/json');
        res.send(result);
    });
}