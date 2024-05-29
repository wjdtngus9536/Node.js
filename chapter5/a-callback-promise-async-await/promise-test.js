const DB = [];

function saveDB(user) {
    const oldDBSize = DB.length;
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return new Promise((resolve, reject) => {
        if (DB.length > oldDBSize) {
            resolve(user);
        }
        else {
            reject(new Error(`Save DB ERROR!`));
        }
    });
}

function sendEmail(user) {
    // console.log(typeof user);
    console.log(`email to ${user.email}`);
    return new Promise((resolve) => {
        resolve(user);
    });
}

function getResult(user) {
    return new Promise((resolve, reject) => {
        resolve(`success register ${user.name}`)
    })
    // `success register ${user.name}`
    }

async function register(user) {
    const result = await saveDB(user).then(sendEmail).then(getResult).catch(error => new Error(error)).finally(() => console.log("완료!"));
    console.log(result);
    return result;
}

const myUser = {
    email: "andy@test.com",
    password: "1234",
    name: "andy"
};

// const allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
// allResult.then(console.log);

const result = register(myUser);
console.log(result); // Promise { <pending> }
// result.then(console.log); // 결과 값이 Promise이므로 then()메서드에 함수를 넣어서 결과값을 볼 수 있음