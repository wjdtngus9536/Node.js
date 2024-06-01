const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');

const jsonData = fs.readFileSync('../password.json', 'utf8');
const password = JSON.parse(jsonData).password;
const uri = `mongodb+srv://wjdtngus9536:${password}@cluster0.5xqv0qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

async function run(){
    await client.connect();
    const adminDB = client.db('whatever').admin(); // 2) admin DB 인스턴스
    const listDatabases = await adminDB.listDatabases(); // 데이터베이스 정보 가져오기
    console.log(listDatabases);
    return "OK";
}

run()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());




// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


