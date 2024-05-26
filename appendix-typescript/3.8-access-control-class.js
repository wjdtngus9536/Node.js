var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Parent = /** @class */ (function () {
    function Parent() {
        this.openInto = "공개 정보";
        this.legacy = "유산";
        this.parentSecret = "부모의 비밀 정보";
    }
    Parent.prototype.checkMySecret = function () {
        console.log(this.parentSecret);
    };
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.secret = "자녀의 비밀 정보";
        return _this;
    }
    Child.prototype.checkLegacy = function () {
        console.log(this.legacy);
    };
    Child.prototype.checkParentSecret = function () {
        console.log(this.parentSecret);
    };
    return Child;
}(Parent));
var Someone = /** @class */ (function (_super) {
    __extends(Someone, _super);
    function Someone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Someone.prototype.checkPublicInfo = function () {
        var p = new Parent();
        console.log(p.openInto);
        console.log(this.legacy);
        console.log(p.parentSecret);
    };
    return Someone;
}(Parent));

var child = new Child();
child.checkLegacy();
child.checkParentSecret();

var someone = new Someone();
someone.checkPublicInfo();
