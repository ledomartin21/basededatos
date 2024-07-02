import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wine } from './interfaces/wine.interface';
import { CreateWineDto } from './dto/create-wine.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from './interfaces/user.interface'; // Importa la interfaz de User

@Injectable()
export class WinesService {
  constructor(
    @InjectModel('Wine') private readonly wineModel: Model<Wine>,
    @InjectModel('User') private readonly userModel: Model<User>, // Inyecta el modelo de User
  ) {}

  async findAll(): Promise<Wine[]> {
    return this.wineModel.find().exec();
  }

  async findOne(id: string): Promise<Wine> {
    return this.wineModel.findById(id).populate('reviews.user', 'name email').exec(); // Popula los datos del usuario
  }

  async create(createWineDto: CreateWineDto): Promise<Wine> {
    const createdWine = new this.wineModel(createWineDto);
    return createdWine.save();
  }

  async addReview(wineId: string, createReviewDto: CreateReviewDto): Promise<Wine> {
    const wine = await this.wineModel.findById(wineId);
    if (!wine) {
      throw new NotFoundException('Wine not found');
    }

    const user = await this.userModel.findById(createReviewDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const review = {
      user: user._id,
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
      date: createReviewDto.date ? createReviewDto.date : new Date(),
    };

    wine.reviews.push(review as any); // Aquí se hace un type assertion a `any` para evitar el error
    await wine.save();
    return wine;
  }
}
