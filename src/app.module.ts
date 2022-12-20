import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest'), StudentModule, TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
