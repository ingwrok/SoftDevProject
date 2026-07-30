import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet, PetStatus } from './entities/pet.entity';
import { PetsService } from './pets.service';
export declare class PetsController {
    private readonly petsService;
    constructor(petsService: PetsService);
    findAll(status?: PetStatus): Pet[];
    findOne(id: string): Pet;
    create(createPetDto: CreatePetDto): Pet;
    update(id: string, updatePetDto: UpdatePetDto): Pet;
    remove(id: string): void;
}
