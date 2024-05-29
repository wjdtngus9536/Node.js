function myWork(work) {
    return new Promise((resolve, reject) => {
        resolve(work.toUpperCase());
    })
}

function playGame(work) {
    return new Promise((resolve, reject) => {
        if (work === 'DONE'){
            resolve('Go Play Game');
        }
    });
}

// 1) 프로미스를 중첩해서 사용
myWork('done')
    .then((result) => {
        playGame(result).then((val) => {
            console.log(val);
        });
    })

// 2) Promise는 resolve()의 실행 결과를 then()으로 넘길 수 있음. 이런 점을 이용해 playGame의 결과를 then()으로 받아서 console.log를 실행
myWork('done')
    .then(playGame)
    .then(console.log);