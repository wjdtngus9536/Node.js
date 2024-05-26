// type Constructor = new(...args: any[]) => {};

// function Hello(constructor: Constructor) {
//     return class extends constructor { // 데코레이터를 적용한 클래스를 상속받은 익명 클래스
//         constructor() { // 생성자 재정의
//             console.log(`Hello`);
//             super();
//         }
//     }
// }

// @Hello
// class DecoratorTest {
//     constructor() {
//         console.log('인스턴스 생성됨');
//     }
// }

// const temp = new DecoratorTest();


// function Hello<T extends { new(...args: any[]): {} }>(constructor: T): T {
//     return class extends constructor {
//         constructor(...args: any[]) {
//             console.log('hello');
//             super(...args);
//         }
//     };
// }

// @Hello
// class DecoratorTest {
//     a: number;

//     constructor(a: number) {
//         this.a = a;
//         console.log('인스턴스 생성됨');
//     }
// }

// const instance = new DecoratorTest(1);

type Constructor = new (...args: any[]) => {};
function HelloDecorator<T extends Constructor>(constructor: T) {
  // console.log(constructor); [clsss DecoratorTest]
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log(`Hello Decorator`);
    }
  };
}

@HelloDecorator
class DecoratorTest {
  constructor(arg1: string) {
    console.log(`인스턴스 생성됨`);
  }
}

const decoTest = new DecoratorTest("테스트");

// console.time("실행 시간");
// execute();
function execute() {
  setTimeout(() => {
    console.log(`실행`);
    console.timeEnd("실행 시간");
  }, 500);
}

function Timer() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.time(`Elapsed time`);
      const result = originalMethod.apply(this, args);  // 이 때의 this는 클래스의 인스턴스
      console.timeEnd(`Elapsed time`);
      return result;
    };
  };
}

class ElapsedTime {
  someVar = "test";

  @Timer()
  hello() {
    console.log(`Hello`);
  }
}

// new ElapsedTime().hello();

function NamedTimer(label: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(args)
      console.time(label);
      const result = originalMethod.apply(this, args);
      console.timeEnd(label);
      return result;
    };
  };
}

class NamedElapsedTime {
    someVar = "test";
    @NamedTimer(`헬로 시간 측정`)
    hello<T>(a:T) {
    console.log(`Hello`);
  }
}

new NamedElapsedTime().hello("이거");