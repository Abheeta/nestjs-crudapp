import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { CreateStudentDto } from 'src/student/dto/create-student.dto';
// import { IStudent } from 'src/student/interface/student.interface';
import { Model } from "mongoose";
// import { UpdateStudentDto } from 'src/student/dto/update-student.dto';
// import { Student, StudentDocument } from '../schema/student.schema';
import { Teacher, TeacherDocument } from 'src/teacher/schema/teacher.schema';
import { CreateTeacherDto } from '../dto/create-teacher.dto';

@Injectable()
export class TeacherService {

    
    constructor(
        // @InjectModel('Student') private studentModel:Model<StudentDocument>,
        @InjectModel('Teacher') private teacherModel:Model<TeacherDocument>
        
    ) { }

    async createTeacher(teacher: CreateTeacherDto): Promise<Teacher>{
        teacher.students = [];
        const newTeacher = await new this.teacherModel(teacher);

        return newTeacher.save();
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
