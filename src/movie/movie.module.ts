import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule], // import cloudinary module để dùng
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
