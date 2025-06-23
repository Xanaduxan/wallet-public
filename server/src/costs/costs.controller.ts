import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CostsService } from './costs.service';
import { AuthService } from 'src/auth/auth.service';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { CreateCostDTO } from './dto/create-cost.dto';
import { UpdateCostDTO } from './dto/update-cost.dto';

@Controller('cost')
export class CostsController {
  constructor(
    private readonly costsService: CostsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JWTGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllCosts(@Req() req, @Res() res) {
    const token = req.token;

    const user = await this.authService.getUserByTokenData(token);
    const costs = await this.costsService.findAll();
    const filtredCosts = costs.filter(
      (cost) => cost.userId === user._id.toString(),
    );
    return res.send(filtredCosts);
  }

  @UseGuards(JWTGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createCosts(@Body() createCostDTO: CreateCostDTO, @Req() req) {
    const user = await this.authService.getUserByTokenData(req.token);
    return await this.costsService.create({
      ...createCostDTO,
      userId: user._id as string,
    });
  }

  @UseGuards(JWTGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateCosts(
    @Body() updateCostDTO: UpdateCostDTO,
    @Param('id') id: string,
  ) {
    return await this.costsService.update(updateCostDTO, id);
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteCosts(@Param('id') id: string) {
    return await this.costsService.delete(id);
  }
}
