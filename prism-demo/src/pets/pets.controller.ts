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
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet, PetStatus } from './entities/pet.entity';
import { PetsService } from './pets.service';

@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all pets',
    description:
      'Retrieve a list of all pets in the store. Optionally filter by status.',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: PetStatus,
    description: 'Filter pets by availability status',
  })
  @ApiOkResponse({ type: [Pet], description: 'Returns the list of pets.' })
  findAll(@Query('status') status?: PetStatus): Pet[] {
    return this.petsService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a pet by ID',
    description: 'Retrieve a specific pet details by its unique identifier.',
  })
  @ApiOkResponse({
    type: Pet,
    description: 'The pet has been successfully found.',
  })
  @ApiNotFoundResponse({ description: 'Pet with specified ID was not found.' })
  findOne(@Param('id') id: string): Pet {
    return this.petsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Add a new pet',
    description: 'Add a new pet to the store.',
  })
  @ApiCreatedResponse({
    type: Pet,
    description: 'The pet has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  create(@Body() createPetDto: CreatePetDto): Pet {
    return this.petsService.create(createPetDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an existing pet',
    description: 'Update details of an existing pet by ID.',
  })
  @ApiOkResponse({
    type: Pet,
    description: 'The pet has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'Pet with specified ID was not found.' })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto): Pet {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a pet',
    description: 'Delete a pet from the store by ID.',
  })
  @ApiOkResponse({ description: 'The pet has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'Pet with specified ID was not found.' })
  remove(@Param('id') id: string): void {
    return this.petsService.remove(id);
  }
}
