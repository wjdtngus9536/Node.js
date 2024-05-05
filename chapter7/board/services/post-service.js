const paginator = require("../utils/paginator");

/* 글쓰기 함수 */
async function writePost(collection, post) {
    console.log("★ collection", collection);
    
    // 생성일시와 조회수를 넣어줍니다.
    post.hits = 0;
    console.log("★ post", post);
    // 날짜는 ISO 포맷으로 저장
    post.createdDT = new Date().toISOString();
    console.log(`services/post-service.js에서 실행됨`);
    // mongodb에 post를 저장 후 결과 반환
    return await collection.insertOne(post);
}

async function list(collection, page, search) {
    const perPage = 10;
    // 1. title이 search와 부분일치하는지 확인
    const query = { title: new RegExp(search, "i") }; // { title: /1/i }
    // console.log("post-service.js에 list함수 query: " ,query);
    
    // 2. limit는 10개만 가져온다는 의미, skip은 설정된 개수만큼 건너뛴다(skip).
    // 생성일 역순으로 정렬
    const cursor = collection.find(query, { limit: perPage, skip: (page - 1) * perPage }).sort({
        createdDT: -1,
    });
    // console.log("post-service.js에 list함수 cursor: " , cursor);

    // 3. 검색어에 걸리는 게시물의 총합
    const totalCount = await collection.count(query);
    const posts = await cursor.toArray(); // 4. 커서로 받아온 데이터를 리스트로 변경

    // 5. 페이지네이터 생성
    const paginatorObj = paginator({ totalCount, page, perPage: perPage });
    return [posts, paginatorObj];
}

// require()로 파일을 import 시 외부로 노출하는 객체
module.exports = {
    writePost,
    list,
};