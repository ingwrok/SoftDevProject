import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet, PetStatus } from './entities/pet.entity';
export declare class PetsService {
    private readonly pets;
    constructor();
    private seedPets;
    findAll(status?: PetStatus): Pet[];
    findOne(id: string): Pet;
    create(createPetDto: CreatePetDto): Pet;
    update(id: string, updatePetDto: UpdatePetDto): Pet;
    remove(id: string): void;
}
