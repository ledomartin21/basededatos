import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema'; // Asegúrate de tener el esquema de User definido y exportado

@Schema()
export class Review {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

@Schema()
export class Wine extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [ReviewSchema], default: [] })
  reviews: Review[];
}

export const WineSchema = SchemaFactory.createForClass(Wine);
s