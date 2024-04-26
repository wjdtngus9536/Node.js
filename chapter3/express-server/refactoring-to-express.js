const express = require("express");
const url = require("url");
const app = express();
const port = 3000;

app.listen(port, () => { // Express 웹 서버를 기동해 클라이언트 요청을 기다림
    console.log("router refactoring by express");
});

// GET 메서드의 라우팅 설정
app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);



function user(req, res){
    const user = url.parse(req.url, true).query;
    res.json(`[user] name: ${user.name}, age: ${user.age}`); // RestAPI Hypermedia As The Engine Of Application State 위반
}

function feed(_, res) {
    res.json(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>
    `);
}