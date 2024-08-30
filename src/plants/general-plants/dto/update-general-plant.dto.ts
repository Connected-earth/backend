import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneralPlantDto } from './create-general-plant.dto';

export class UpdateGeneralPlantDto extends PartialType(CreateGeneralPlantDto) {}
