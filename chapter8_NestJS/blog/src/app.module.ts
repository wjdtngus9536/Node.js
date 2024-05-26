import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog, BlogSchema } from './blog.schema';
import { BlogMongoRepository } from './blog.repository';
// const fs = require('fs');
// let password: string;
// fs.readFile('../../../password.json', 'utf8', (err, jsonString) => {
//     if (err) {
//       console.error('Error reading JSON file:', err);
//     } else {
//       try {
//         const data = JSON.parse(jsonString);
//         password = data[0].password
//       } catch (err) {
//         console.error('Error parsing JSON:', err);
//       }
//     }
//   });

@Module({
  imports: [
    // 1. 몽고디비 연결 설정
    MongooseModule.forRoot(
      `mongodb+srv://wjdtngus9536:qmffhrm0722@cluster0.5xqv0qb.mongodb.net/blog`
    ),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogMongoRepository],
})
export class AppModule {}
