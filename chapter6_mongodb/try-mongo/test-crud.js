// import { MongoClient, ServerApiVersion } from 'mongodb';
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const jsonData = fs.readFileSync('../password.json', 'utf8');
const password = JSON.parse(jsonData).password;

const uri = `mongodb+srv://wjdtngus9536:${password}@cluster0.5xqv0qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

async function main(){
    try {
        await client.connect();

        const collection = client.db('test').collection('person'); // test 데이터베이스 사용, person 컬렉션 사용
        
        await collection.insertOne({ name: 'Andy', age: 30 }); // json 형식의 객체 넣기
        console.log('문서 추가 완료');

        const documents = await collection.find({ name: 'Andy' }).toArray(); // 결과 값이 여러개일 수 있으므로 toArray()함수를 사용해 배열로 반환
        console.log('찾은 문서', documents);

        // 6. 문서 업데이트, 업데이트할 도큐먼트를 찾는데 사용할 JSON 객체를 첫 번째 인수로, $set의 값으로 업데이트할 값을 두 번째 인수로
        await collection.updateOne({ name: 'Andy' }, { $set: { age: 31 } }); // $set은 몽고디비의 연산자로 값을 필드에 지정할 때 사용
        console.log('문서 업데이트')

        // 7. 갱신된 문서 확인
        const updatedDocuments = await collection.find({ name: 'Andy' }).toArray();
        console.log('갱신된 문서', updatedDocuments);

        // 8. 문서 삭제하기
        await collection.deleteOne({ name: 'Andy' });
        console.log('문서 삭제');

        await client.close();
    } catch(err) {
        console.error(err);
    }
}

main()