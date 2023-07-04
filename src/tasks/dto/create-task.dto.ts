export class CreateTaskDto {
  title;
  description;

  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}
