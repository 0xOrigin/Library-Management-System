import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateBookDto {
  @Length(5, 150)
  @IsNotEmpty()
  title: string;

  @Length(5, 150)
  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  isbn: string;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  availableQuantity: number;

  @Length(5, 200)
  @IsNotEmpty()
  shelfLocation: string;

  constructor(partial: Partial<CreateBookDto>) {
    Object.assign(this, partial);
  }
}
