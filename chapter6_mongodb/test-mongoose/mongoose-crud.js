const fs = require("fs");
const jsonData = fs.readFileSync('../password.json', 'utf8');
const password = JSON.parse(jsonData).password;

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const Person = require("./person-model");


mongoose.set("strictQuery", false); // 1) 몽구스에서 쿼리에 필터를 빈 객체인 {}로 넣으면 모든 값을 불러오게 되어 문제가 되는 경우가 有, 쿼리 필터 {}에 에러를 내도록 하는 설정이 strictQuery
const app = express();
app.use(bodyParser.json()); // 2) HTTP에서 Body를 파싱하기 위한 미들웨어
app.listen(3000, async () => {
    console.log("Server started");

    const mongodbUri = `mongodb+srv://wjdtngus9536:${password}@cluster0.5xqv0qb.mongodb.net/test?retryWrites=true&w=majority`;

    mongoose
        .connect(mongodbUri)
        .then(console.log);
})

// 5) person 데이터 추가하기
app.put("/person/:email", async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
});

// 4) 모든 person 데이터 출력
app.get("/person", async (req, res) => {
    const person = await Person.find({});
    res.send(person);
});

// 5) 특정 email로 person 찾기
app.get("/person", async (req, res) => {
    const person = await Person.findOne({ email: req.params.email });
    res.send(person);
});

// 7) person 데이터 수정하기
app.put("/person/:email", async (req, res) => {
    const person = await Person.findOneAndUpdate(
        { email: req.params.email },
        { $set: req.body },
        { new: true }
    );
    console.log(person);
    res.send(person);
});

// 8) person 데이터 삭제하기
app.delete("/person/:email", async (req, res) => {
    await Person.deleteMany({ email: req.params.email });
    res.send({ success: true });
});