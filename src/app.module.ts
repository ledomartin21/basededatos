import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WinesModule } from './wines/wines.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/vinos2'), WinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
