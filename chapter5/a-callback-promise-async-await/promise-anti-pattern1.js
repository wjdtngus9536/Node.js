function myWork(work) {
    return new Promise((resolve, reject) => {
        if (work == 'done') {
            resolve("게임 가능");
        }
        else {
            reject(new Error("게임 불가능"));
        }
    })
}
    
// 1. 콜백과 다를 바가 없음 
myWork('done').then(function (value) { console.log(value) }, function (err) { console.error(err) });

// then에서는 Promise가 이행된 경우만 처리
// 2. 좋음
myWork('doing')
    .then(function (value) { console.log(value) })
    .catch(function (err) { console.error(err) });
