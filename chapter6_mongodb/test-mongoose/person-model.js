var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    age: Number,
    email: { type: String, required: true },
});

// 2. 모델 객체 생성
module.exports = mongoose.model('Author', personSchema, 'person'); 
// 첫 번째 인자는 컬렉션명, 몽고디비 내부적으로 소문자 & 복수형으로 변환된 단어를 컬렉션 명으로 사용한다. 3번째 인자로 컬렉션 명을 지정 가능하다. 