import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { RevenueDay, RevenueDaySchema } from './schemas/revenueDay.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      { name: RevenueDay.name, schema: RevenueDaySchema },
    ])
  ],
  providers: [AppService],
})
export class AppModule {}
