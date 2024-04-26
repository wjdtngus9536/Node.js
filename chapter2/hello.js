const http = require("http"); // http모듈을 불러와서 변수에 할당
let count = 0;

const server = http.createServer((req, res) => { // 서버 인스턴스를 만드는 함수 콜백함수를 인수로 받아 http 서버로 요청이 들어오면 해당 요청을 처리할 함수를 설정
    log(count);
    res.statusCode.Code = 200;
    res.setHeader("Content-Type", "text/plain"); //HTTP는 요청/응답에 대한 부가 정보를 header에 설정할 수 있음 그 콘텐츠 타입이 text/plain = 텍스트를 평문으로 해석하겠다.
    res.write("hello\n");

    // prettier-ignore
    setTimeout(() => {
        res.end("Node.js"); // 2초 후 "Node.js"를 응답으로 주고 http 커넥션을 끝내는 동작
    }, 2000);
})

function log(count) {
    console.log((count += 1));
}

server.listen(8000, () => console.log("Hello Node.js")); // 사용할 포트번호를 8000번으로 지정, IP가 생략되었으므로 기본값인 localhost or 127.0.0.1로 서버에 접근 가능