import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose"
import { Student } from "src/student/schema/student.schema";
import * as mongoose from 'mongoose';

export type TeacherDocument = mongoose.HydratedDocument<Teacher>;


@Schema()
export class Teacher {
  
   @Prop({required:true, index:true, unique:true})
   teacherId: number;
   @Prop()
   name: string;
   @Prop()
   teaches: [
    {
        class:number,
        course:string
    }
   ]
   @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Student' })
   students: Student[];

}
export const TeacherSchema = SchemaFactory.createForClass(Teacher);