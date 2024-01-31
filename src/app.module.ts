import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { MovieModule } from './movie/movie.module';
import { TheaterModule } from './theater/theater.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [AuthModule, UserModule, BookingModule, MovieModule, TheaterModule, ConfigModule.forRoot({
    isGlobal: true
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
