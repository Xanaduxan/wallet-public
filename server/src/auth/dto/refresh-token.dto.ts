import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDTO {
  @IsNotEmpty()
  readonly refresh_token: string;

  @IsNotEmpty()
  readonly username: string;
}
