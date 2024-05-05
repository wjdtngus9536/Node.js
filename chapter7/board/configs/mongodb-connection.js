const pw = require("../../../password.json");

const { MongoClient } = require("mongodb");
// 기본값으로 선택하는 데이터베이스 /board를 명시, 명시하지 않으면 첫 데이터가 추가될 때 지정한 데이터베이스도 자동으로 생성됨
const uri = `mongodb+srv://wjdtngus9536:${pw.password}@cluster0.5xqv0qb.mongodb.net/board`

console.log(uri);

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
};

