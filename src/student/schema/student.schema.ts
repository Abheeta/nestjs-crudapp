import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import * as mongoose from 'mongoose';
import { Teacher } from "src/teacher/schema/teacher.schema";

export type StudentDocument = mongoose.HydratedDocument<Student>;

@Schema()
export class Student {
  
   @Prop({required:true, index:true, unique:true})
   studentId: number;
   @Prop()
   name: string;
   @Prop()
   class: number;
   @Prop()
   courses:[string];
   @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Teacher' })
   teachers:Teacher[];
}
export const StudentSchema = SchemaFactory.createForClass(Student);