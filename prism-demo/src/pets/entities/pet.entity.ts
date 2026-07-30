import { ApiProperty } from '@nestjs/swagger';

export enum PetStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  SOLD = 'sold',
}

export class Pet {
  @ApiProperty({
    description: 'The unique identifier of the pet',
    example: 'd3b07384-d113-4956-a5db-80d4b8d7eb8f',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the pet',
    example: 'Max',
  })
  name: string;

  @ApiProperty({
    description: 'The category of the pet',
    example: 'Dogs',
    required: false,
  })
  category?: string;

  @ApiProperty({
    description: 'Tags associated with the pet',
    example: ['friendly', 'vaccinated'],
    type: [String],
    required: false,
  })
  tags?: string[];

  @ApiProperty({
    description: 'URLs to photos of the pet',
    example: ['https://example.com/pet/max.jpg'],
    type: [String],
  })
  photoUrls: string[];

  @ApiProperty({
    description: 'The availability status of the pet',
    enum: PetStatus,
    example: PetStatus.AVAILABLE,
  })
  status: PetStatus;
}
