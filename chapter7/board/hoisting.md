# 호이스팅

JS 호이스팅은 인터프리터가 코드를 실행하기 전에 함수, 변수, 클래스 또는 임포트의 선언문을 해당 범위의 맨 위로 끌어오릴는 것처럼 보이는 현상을 말한다.

컴파일 단계에서 함수와 변수 선언을 스캔하고, 모든 함수와 변수 선언들은 렉시컬 환경이라 불리는 자바스크립트 데이터 구조 내의 메모리에 추가된다.

1. let과 const는 호이스팅이 된다.
```javascript
var hoist = "AA";

(function func() {
  console.log(hoist); // Output: ReferenceError
  let hoist = "BB";
})();
/* 만약 let과 const가 호이스팅이 되지 않는다면 console.log(hoist) 에 'AA' 가 출력되어야 하는데 ReferenceError 가 발생한다. 즉 let과 const도 호이스팅된다.*/
```

2. 함수 선언식은 호이스팅이 된다.
```javascript
hoisted(); // Output: "This function has been hoisted."

function hoisted() {
  console.log('This function has been hoisted.');
};
```

3. 함수 표현식은 호이스팅이 되지 않는다.
```javascript
expression(); // Output: "TypeError: expression is not a function

var expression = function() {
    console.log('will this work?');
};

```


### 결론
호이스팅은 함수를 어디에 선언 하였든지, 신경 쓰지 않고 필요한 곳에서 자유롭게 사용하기 위해 만들어진 기능이다. 그러나 이 기능이 때로는 의도치 않은 버그를 생성할 여지가 있다. 따라서 호이스팅을 의도적으로 사용하는 경우가 아니라면 호이스팅이 되지 않거나, Temporal Dead Zone 으로 초기화 되는 let, const, 함수 표현식을 사용하는 것을 권장한다.