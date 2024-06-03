const axios = require("axios");

async function getTop20Movies() {
    const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";
    try{
        // 2) 네트워크에서 데이터를 받아오므로 await로 기다림
        const result = await axios.get(url);
        const { data } = result; // result에는 data 프로퍼티가 있음
        // console.log(data);

        const movieInfos = data.articleList.map((article, idx) => {
            return { title: article.title, rank: idx + 1 };
        });
        
        // 데이터 출력
        for (let movieInfo of movieInfos) {
            console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
        }
    } 
    catch(err) {
        throw new Error(err);
    }
}

console.log(getTop20Movies());