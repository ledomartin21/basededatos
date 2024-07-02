import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WineSchema, Wine } from './schemas/wine.schema';
import { UserSchema, User } from './schemas/user.schema';
import { WinesService } from './wines.service';
import { WinesController } from './wines.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wine.name, schema: WineSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [WinesService],
  controllers: [WinesController],
})
export class WineModule {}
