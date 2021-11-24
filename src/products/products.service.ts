import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getProducs(): string {
    return 'All products';
  }
}
