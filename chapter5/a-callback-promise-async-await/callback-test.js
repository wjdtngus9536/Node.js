const DB = [];

// 회원 가입 API 함수
function register(user) { // 3중 콜백 함수
    return saveDB(user, function (user) {
        return sendEmail(user, function (user) {
                return getResult(user);
            }
        );
    });
}

function saveDB(user, callback) {
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return callback(user);
}

function sendEmail(user, callback) {
    console.log(`email to ${user.email}`);
    return callback(user);
}

function getResult(user) {
    return `success register %{user.name}`;
}

const result = register({ email: "andy@test.com", password: "1234", name: "andy" });
console.log(result);