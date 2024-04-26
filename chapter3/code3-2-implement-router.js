const http = require("http");
const url = require("url"); // url 모듈을 로딩해서 변수에 할당

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // url 모듈로 req로 받은 url의 pathname을 얻는다, true시 쿼리 스트링도 함께 파싱
    console.log(path);
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path === "/user") {
        res.end("[user] name : andy, age: 30");
    } else if (path === "/feed") {
        res.end(`<meta charset="utf-8"><ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        <ul>\
    `);
    } else {
        res.statusCode = 404;
        res.end("404 page no found");
    }
})
.listen("3000", () => console.log("라우터를 만들어보자"));