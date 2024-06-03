// async function myName(){
//     return "Andy";
// }

// async function showName(){
//     const name = await myName();
//     console.log(name);
//     return name;
// }

// const a = showName();
// console.log(a);

const waitOneSecond = async (msg) => {
    return new Promise((resolve, _) => {
        setTimeout(() => resolve(msg), 1000);
    });
}

async function countOneToTen(){
    try{
        for (let x of [...Array(10).keys()]) {
            let result = await waitOneSecond(`${x + 1}초 대기 중...`);
            console.log(typeof result);
        }
        console.log("완료");
    } 
    catch(err) {
        throw new Error(err);
    }
    finally {
        return 5;
    }
}

console.log(countOneToTen());