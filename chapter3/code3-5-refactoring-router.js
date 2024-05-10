// 리팩토링한 라우터
const http = require("http");
const url = require("url");

http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;
  res.setHeader("Content-Type", "text/html");
  console.log(path);
  if (path in urlMap) {
    try {
      urlMap[path](req, res);
    } catch (err) {
      console.log(err);
      serverError(req, res);
    }
  } else {
    notFound(req, res);
  }
}).listen("3000", () => console.log("라우터를 리팩토링 해보자!"));

function user(req, res) {
  // throw Error("!!!");
  const user = url.parse(req.url, true).query;
  res.end(`[user] name : ${user.name}, age: ${user.age}`);
}

function feed(req, res) {
  res.end(`<ul>
          <li>picture1</li>
          <li>picture2</li>
          <li>picture3</li>
        </ul>
        `);
}

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
};

const serverError = (req, res) => {
  res.statusCode = 500;
  res.end("500 server error");
};

const urlMap = {
  "/": (req, res) => res.end("HOME"),
  "/user": user, // 자바스크립트에서는 함수가 일급 객체이므로 값으로 할당이 가능하고 함수의 결과로 받을 수도 있음
  "/feed": feed,
};