const express = require("express");
const app = express();
let posts = [];

// req.body를 사용하려면 json 미들웨어를 사용해야한다.
// 사용하지 않으면 undefined로 나옴.
app.use(express.json()); // Test ★

// post 요청 시 컨텐츠 타입이 application/x-www-form-urlencoded인 경우 파싱
app.use(express.urlencoded({ extended: true})); // json 미들웨어와 함께 사용

app.get("/", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const { title, name, text} = req.body; // 자바 스크립트 구조 분해 할당(배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 함)
  // 게시글 리스트에 새로운 게시글 정보 추가
  posts.push({id: posts.length + 1, title, name, text, createdDt: Date()});
  res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => { //:id 부분은 경로 delete(핸들러) 내에서 액세스할 수 있는 "id"라는 URL 매개변수를 나타냅니다. (:id === 삭제할 게시물의 id)
  const id = req.params.id;
  const filteredPosts = posts.filter((post) => post.id !== +id); // +id는 string인 id를 int로 변경한다는 뜻
  const isLengthChanged = posts.length !== filteredPosts.length;
  posts = filteredPosts;
  if (isLengthChanged){
    res.json("OK");
    return;
  }
  res.json("not changed");
});

app.listen(3000, () => {
  console.log("welcome posts Start!");
});