import { IsNotEmpty } from 'class-validator';

export class UpdateCostDTO {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly date: Date;
}
