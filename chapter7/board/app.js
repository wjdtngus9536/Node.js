const express = require("express");
const handlebars = require("express-handlebars");
const mongodbConnection = require("./configs/mongodb-connection"); // 몽고db 연결함수
const postService = require("./services/post-service"); // 서비스 파일 로딩


// HTTP의 POST메서드 사용 시 데이터를 req.body로 넘기는데, 해당 데이터를 사용하려면 익스프레스에 [미들웨어]를 설정해야 한다. 미사용시 req.body 값이 undefined로 나온다.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // HTTP POST 요청의 본문(body)에 인코딩된 데이터를 해석하고 req.body 객체에 채워주는 역할을 하는 미들웨어 함수

app.engine(
    "handlebars", // 핸들바 생성 및 엔진 반환 
    /* handlebars.create()함수는 handlebars 객체를 만들 때 사용, 옵션에서 헬퍼 함수를 추가할 수 있음.
       helpers: require("./configs/handlebars-helpers")로 커스텀 헬퍼 함수를 추가, handlebars 객체에 있는 engine을 설정*/
    handlebars.create({ helpers: require("./configs/handlebars-helpers") }).engine
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // 1. 현재 페이지 데이터
    console.log(page);
    const search = req.query.search || ""; // 검색어 데이터
    try {
        // 2. postService.list에서 글 목록과 페이지네이터를 가져옴
        const [posts, paginator] = await postService.list(collection, page, search);

        // 3. 리스트 페이지 렌더링
        res.render("home", { title: "테스트 게시판", search, paginator, posts });
    }
    catch (err) {
        console.error(err);
        res.render("home", { title: "테스트 게시판"});
        // 4. 에러가 나는 경우는 빈 값으로 렌더링
    }

    // res.render("home", { title: "안녕하세요", message: "만나서 반갑습니다!" });
});

app.get("/write", (req, res) => {
    res.render("write", { title: "테스트 게시판" });
});

app.post("/write", async (req, res) => {
    const post = req.body;
    const result = await postService.writePost(collection, post); // 글쓰기 후 결과 반환
 
    // 생성된 도큐먼트의 _id를 사용해 상세페이지로 이동
    res.redirect(`/detail/${result.insertedId}`); // console.log("저장된 결과에는 도큐먼트의 식별자로 사용할 수 있는 insertedId값이 있음", result.insertedId); 
});


// 게시글 정보 가져오기
app.get("/detail/:id", async (req, res) => {
    res.render("detail", {
        title: "테스트 게시판",
    });
});



let collection;
app.listen(3000, async () => { // listen 위치는 어디어야 하는가? 젤 밑
    console.log("Server started");
    const mongoClient = await mongodbConnection();

    // mongoClient.db()로 디비 선택 collection()으로 컬렉션 선택 후 collection에 할당
    collection = mongoClient.db().collection("post");
    console.log(collection);
    console.log("MongoDB connected");
});