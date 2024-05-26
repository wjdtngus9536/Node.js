type tConstructor<T = {}> = new(...args: any[]) => T;

function countDecorator<T extends tConstructor>(constructor: T) {
    return class extends constructor {
        constructor(){
            console.log(`hello`);
            super();
        }
    }
}

@countDecorator
class Clicker {
    count: number = 0;

    constructor() {
        console.log(`인스턴스 생성됨`)
    }

    click() {
        console.log('click');
        // this.count += 1
        // console.log(`click! [${this.count}}]`)
        // return this.count;
    }
}