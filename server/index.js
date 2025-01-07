const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


// 测试数据
//const testData = {
//  data: [
//    {
//      "_id": "1",
//      "author": "Author1",
//      "category": "Category1",
//      "createdAt": "2023-01-01T00:00:00Z",
//      "desc": "Description1",
//      "images": ["http://example.com/image1.jpg"],
//      "likeCounts": 10,
//      "publishedAt": "2023-01-01T00:00:00Z",
//      "stars": 5,
//      "title": "Title1",
//      "type": "Type1",
//      "url": "http://example.com/url1",
//      "views": 100
//    },
//    {
//      "_id": "2",
//      "author": "Author2",
//      "category": "Category2",
//      "createdAt": "2023-01-02T00:00:00Z",
//      "desc": "Description2",
//      "images": ["http://example.com/image2.jpg"],
//      "likeCounts": 20,
//      "publishedAt": "2023-01-02T00:00:00Z",
//      "stars": 4,
//      "title": "Title2",
//      "type": "Type2",
//      "url": "http://example.com/url2",
//      "views": 200
//    },
//    {
//      "_id": "3",
//      "author": "Author3",
//      "category": "Category3",
//      "createdAt": "2023-01-03T00:00:00Z",
//      "desc": "Description3",
//      "images": ["http://example.com/image3.jpg"],
//      "likeCounts": 30,
//      "publishedAt": "2023-01-03T00:00:00Z",
//      "stars": 3,
//      "title": "Title3",
//      "type": "Type3",
//      "url": "http://example.com/url3",
//      "views": 300
//    },
//    {
//      "_id": "4",
//      "author": "Author4",
//      "category": "Category4",
//      "createdAt": "2023-01-04T00:00:00Z",
//      "desc": "Description4",
//      "images": ["http://example.com/image4.jpg"],
//      "likeCounts": 40,
//      "publishedAt": "2023-01-04T00:00:00Z",
//      "stars": 2,
//      "title": "Title4",
//      "type": "Type4",
//      "url": "http://example.com/url4",
//      "views": 400
//    },
//    {
//      "_id": "5",
//      "author": "Author5",
//      "category": "Category5",
//      "createdAt": "2023-01-05T00:00:00Z",
//      "desc": "Description5",
//      "images": ["http://example.com/image5.jpg"],
//      "likeCounts": 50,
//      "publishedAt": "2023-01-05T00:00:00Z",
//      "stars": 1,
//      "title": "Title5",
//      "type": "Type5",
//      "url": "http://example.com/url5",
//      "views": 500
//    },
//    {
//      "_id": "6",
//      "author": "Author6",
//      "category": "Category6",
//      "createdAt": "2023-01-06T00:00:00Z",
//      "desc": "Description6",
//      "images": ["http://example.com/image6.jpg"],
//      "likeCounts": 60,
//      "publishedAt": "2023-01-06T00:00:00Z",
//      "stars": 5,
//      "title": "Title6",
//      "type": "Type6",
//      "url": "http://example.com/url6",
//      "views": 600
//    },
//    {
//      "_id": "7",
//      "author": "Author7",
//      "category": "Category7",
//      "createdAt": "2023-01-07T00:00:00Z",
//      "desc": "Description7",
//      "images": ["http://example.com/image7.jpg"],
//      "likeCounts": 70,
//      "publishedAt": "2023-01-07T00:00:00Z",
//      "stars": 4,
//      "title": "Title7",
//      "type": "Type7",
//      "url": "http://example.com/url7",
//      "views": 700
//    },
//    {
//      "_id": "8",
//      "author": "Author8",
//      "category": "Category8",
//      "createdAt": "2023-01-08T00:00:00Z",
//      "desc": "Description8",
//      "images": ["http://example.com/image8.jpg"],
//      "likeCounts": 80,
//      "publishedAt": "2023-01-08T00:00:00Z",
//      "stars": 3,
//      "title": "Title8",
//      "type": "Type8",
//      "url": "http://example.com/url8",
//      "views": 800
//    },
//    {
//      "_id": "9",
//      "author": "Author9",
//      "category": "Category9",
//      "createdAt": "2023-01-09T00:00:00Z",
//      "desc": "Description9",
//      "images": ["http://example.com/image9.jpg"],
//      "likeCounts": 90,
//      "publishedAt": "2023-01-09T00:00:00Z",
//      "stars": 2,
//      "title": "Title9",
//      "type": "Type9",
//      "url": "http://example.com/url9",
//      "views": 900
//    },
//    {
//      "_id": "10",
//      "author": "Author10",
//      "category": "Category10",
//      "createdAt": "2023-01-10T00:00:00Z",
//      "desc": "Description10",
//      "images": ["http://example.com/image10.jpg"],
//      "likeCounts": 100,
//      "publishedAt": "2023-01-10T00:00:00Z",
//      "stars": 1,
//      "title": "Title10",
//      "type": "Type10",
//      "url": "http://example.com/url10",
//      "views": 1000
//    }
//  ],
//  "page": 1,
//  "page_count": 1,
//  "status": 200,
//  "total_counts": 10
//};

// 读取 data.json 文件
const dataPath = path.join(__dirname, 'data.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));


// 定义一个路由来返回测试数据
app.get('/api/girls', (req, res) => {
//app.get('', (req, res) => {
//  res.json(testData);

  //提取 page 参数
  const page = parseInt(req.query.page, 10) || 1; // 默认页码为 1
  const pageSize = 2; // 每页显示的数据条数
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  //返回分页数据：
  const paginatedData = testData.slice(startIndex, endIndex);

  res.json({
    page: page,
    pageSize: pageSize,
    total: testData.length,
    data: paginatedData
  });

});

// 启动服务器
//app.listen(port, () => {
//  console.log(`Server running at http://localhost:${port}/`);
//});
// 监听所有网络接口
//const PORT = 443;
const PORT = 3000;
const HOST = '192.168.3.223';//每天IP不一样,每次运行都要检查下这个IP是否设置正确
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});