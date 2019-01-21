# 书查查 - library-book-search

图书馆书籍查询 WebApp，项目演示地址：[书查查](http://ser.caijin.tech:3003)，或者使用手机扫描二维码查看：
<div><img src="https://github.com/orbem/library-book-search/blob/master/img/qrcode.png" /></div>


推荐使用手机预览，电脑请在 Chrome 调试模式下的手机模式。

## 预览

**主页、查询列表**

<div align="center">
  <img width="400" src="https://github.com/orbem/library-book-search/blob/master/img/a.png" />
  <img width="400" src="https://github.com/orbem/library-book-search/blob/master/img/b.png" />
</div>

**书籍详情、收藏列表**

<div align="center">
  <img width="400" src="https://github.com/orbem/library-book-search/blob/master/img/c.png" />
  <img width="400" src="https://github.com/orbem/library-book-search/blob/master/img/d.png" />
</div>

## 技术栈

**后端**

- express
- mysql

**前端**

- Vue 全家桶（vue-cli, vue-router, vuex）
- axios
- sass

## TodoList

**后端**

- [x] 爬取所有书籍数据
- [x] 查表，返回搜索结果列表
- [x] 查表，返回对应书籍
- [x] 部署至服务器

**前端**

- [ ] 界面设计（暂时不是很完美）
- - [x] 搜索页面
- - [x] 检索列表页面
- - [x] 书籍详情页面
- [x] 请求需要检索的书籍名
- [x] 展示结果列表
- [x] 请求并展示书籍详细信息
