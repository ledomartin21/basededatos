import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  readonly userId: string;  // Referencia al ID del usuario

  @IsInt()
  readonly rating: number;

  @IsString()
  readonly comment: string;

  @IsOptional()
  readonly date?: Date;  // Hacer la fecha opcional
}
