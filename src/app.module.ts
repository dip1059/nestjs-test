import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { UserAndPostModule } from './users_posts/users_posts.module';

@Module({
  imports: [ProductModule, UserAndPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
