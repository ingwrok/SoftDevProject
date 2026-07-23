import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { PetStatus } from '../entities/pet.entity';

export class CreatePetDto {
  @ApiProperty({
    description: 'The name of the pet',
    example: 'Max',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The category of the pet',
    example: 'Dogs',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'Tags associated with the pet',
    example: ['friendly', 'vaccinated'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'URLs to photos of the pet',
    example: ['https://example.com/pet/max.jpg'],
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  photoUrls: string[];

  @ApiProperty({
    description: 'The availability status of the pet',
    enum: PetStatus,
    example: PetStatus.AVAILABLE,
  })
  @IsEnum(PetStatus)
  status: PetStatus;
}
