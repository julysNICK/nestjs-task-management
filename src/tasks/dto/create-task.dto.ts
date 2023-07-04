import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title;

  @IsNotEmpty()
  description;

  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}
