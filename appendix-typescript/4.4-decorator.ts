function Hello(constructor: Function) {
    console.log('hello');
}

@Hello
class DecoratorTest {
    constructor() {
        console.log('인스턴스 생성됨');
    }
}

const temp = new DecoratorTest();