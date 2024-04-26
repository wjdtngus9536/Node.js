const express = require("express"); // express 모듈 불러오기
const app = express();  // express를 초기화 후 app에 할당

const port = 3000;

app.get("/", (req, res) => {
    res.set({ "Content-Type": "text/html; charset=utf-8" });
    res.end("헬로 Express");
});

app.listen(port, () => {
    console.log(`start server: use ${port}`);
});