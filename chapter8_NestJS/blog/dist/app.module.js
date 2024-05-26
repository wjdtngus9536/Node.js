"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blog_controller_1 = require("./blog.controller");
const blog_service_1 = require("./blog.service");
const blog_schema_1 = require("./blog.schema");
const blog_repository_1 = require("./blog.repository");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://wjdtngus9536:qmffhrm0722@cluster0.5xqv0qb.mongodb.net/blog`),
            mongoose_1.MongooseModule.forFeature([{ name: blog_schema_1.Blog.name, schema: blog_schema_1.BlogSchema }]),
        ],
        controllers: [blog_controller_1.BlogController],
        providers: [blog_service_1.BlogService, blog_repository_1.BlogMongoRepository],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map