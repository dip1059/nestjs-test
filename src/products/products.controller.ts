import { Controller, Get } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly appService: ProductService) {}

  @Get()
  getProducts(): string {
    return this.appService.getProducs();
  }
}
