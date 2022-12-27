import { Module } from '@nestjs/common';
import { StudentService } from './service/student.service';
import { StudentController } from './controller/student.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from '../teacher/schema/teacher.schema';
import { TeacherModule } from '../teacher/teacher.module';


@Module({
  imports: [MongooseModule.forFeatureAsync([
    { 
      name: Student.name,
      inject: [getModelToken(Teacher.name)],
      imports: [TeacherModule],
      // imports: [MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }])],
      useFactory: (teacherModel) =>{
        const schema = StudentSchema;
        schema.pre('save', function(){
            teacherModel.updateMany(
              {
                "_id": {$in: this.teachers},   
              },
              {
                $push: {"students": this._id}
              },
         
            )          
                    
        })
        return schema;
      }  
    }]),
  TeacherModule
  ],
  
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
