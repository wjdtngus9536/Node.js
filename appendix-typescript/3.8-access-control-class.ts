class Parent {
    openInto = "공개 정보";
    protected legacy = "유산";
    private parentSecret = "부모의 비밀 정보";

    checkMySecret() {
        console.log(this.parentSecret);
    }
}

class Child extends Parent {
    private secret = "자녀의 비밀 정보";

    checkLegacy() {
        console.log(this.legacy);
    }

    checkParentSecret() {
        // console.log(this.parentSecret);
    }
}

class Someone extends Parent{
    checkPublicInfo() {
        const p = new Parent();
        console.log(p.openInto)
        console.log(this.legacy);
        // console.log(p.parentSecret);
    }
}

const child = new Child();
child.checkLegacy();

const someone = new Someone();
someone.checkPublicInfo();