// 모든 요청에 ok를 반환해주는 서버
const http = require("http");

const server = http.createServer((req, res) =>{
    res.setHeader("Content-Type", "text/html"); // text를 HTML로 해석하겠다는 의미
    res.end("OK"); // OK 전달 후 응답을 종료
})

server.listen("3000", () => console.log("OK 서버 시작!"));