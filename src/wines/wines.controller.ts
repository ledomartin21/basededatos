import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WinesService } from './wines.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Wine } from './interfaces/wine.interface';

@Controller('wines')
export class WinesController {
  constructor(private readonly winesService: WinesService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Wine> {
    return this.winesService.findOne(id);
  }

  @Post(':id/reviews')
  async addReview(@Param('id') id: string, @Body() createReviewDto: CreateReviewDto): Promise<Wine> {
    return this.winesService.addReview(id, createReviewDto);
  }

  // Otros endpoints para manejar los vinos...
}
