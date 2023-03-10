import { Module } from '@nestjs/common';
import { TeacherService } from './service/teacher.service';
import { TeacherController } from './controller/teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schema/teacher.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }])],
  providers: [TeacherService],
  controllers: [TeacherController],
  exports: [ TeacherService,MongooseModule]
})
export class TeacherModule {}
