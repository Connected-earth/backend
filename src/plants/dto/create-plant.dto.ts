export class CreatePlantDto {
  id: number;
  type: string;
  name: string;
  remark: string;
  sensorId: number;
  createdAt: Date;
  updatedAt: Date;
}
