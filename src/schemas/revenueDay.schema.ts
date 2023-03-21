import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v1 } from 'uuid';

export type RevenueDayDocument = RevenueDay & Document;

@Schema({ collection: 'revenue-day' })
export class RevenueDay {
  @Prop({ default: v1 })
  _id: string;

  @Prop()
  movieName: string;

  @Prop()
  revenue: string;

  @Prop()
  numberOfTickets: string;

  @Prop()
  numberOfScreenings: string;

  @Prop()
  createdAt: number;
}

export const RevenueDaySchema = SchemaFactory.createForClass(RevenueDay);