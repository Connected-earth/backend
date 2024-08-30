import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneralPlantsService } from './general-plants.service';
import { CreateGeneralPlantDto } from './dto/create-general-plant.dto';
import { UpdateGeneralPlantDto } from './dto/update-general-plant.dto';

@Controller('general-plants')
export class GeneralPlantsController {
  constructor(private readonly generalPlantsService: GeneralPlantsService) {}

  @Post()
  create(@Body() createGeneralPlantDto: CreateGeneralPlantDto) {
    return this.generalPlantsService.create(createGeneralPlantDto);
  }

  @Get()
  findAll() {
    return this.generalPlantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalPlantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneralPlantDto: UpdateGeneralPlantDto) {
    return this.generalPlantsService.update(+id, updateGeneralPlantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalPlantsService.remove(+id);
  }
}
