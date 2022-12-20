import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { IStudent } from 'src/student/interface/student.interface';
import { Model } from "mongoose";
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';
import { Student, StudentDocument } from '../schema/student.schema';
import { Teacher, TeacherDocument } from 'src/teacher/schema/teacher.schema';

@Injectable()
export class StudentService {


    constructor(
        @InjectModel('Student') private studentModel:Model<StudentDocument>,
        @InjectModel('Teacher') private teacherModel:Model<TeacherDocument>
        
    ) { }

    async createStudent(student: CreateStudentDto): Promise<Student>{
        // console.log(student);
        try{
        const result = await this.teacherModel.find(
            {
                "teaches.class": {$eq: student.class},
                "teaches.course": {$in: student.courses}
            }
        ).select("_id").exec()
        // .exec((err, result)=>{
        //     if(err) console.log(err);
        //     console.log(result);

        // })
        student.teachers = result;
        
        const newStudent = await new this.studentModel(student);
        
        return newStudent.save();}
        catch(err){
            console.log(err);
        }
     }


    //  async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<IStudent> {
    //     const existingStudent = await this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, { new: true });
    //    if (!existingStudent) {
    //      throw new NotFoundException(`Student #${studentId} not found`);
    //    }
    //    return existingStudent;
    // }

    // async deleteStudent(studentId: string): Promise<IStudent> {
    //     const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
    //    if (!deletedStudent) {
    //      throw new NotFoundException(`Student #${studentId} not found`);
    //    }
    //    return deletedStudent;
    // }
    
}
