import { PetStatus } from '../entities/pet.entity';
export declare class CreatePetDto {
    name: string;
    category?: string;
    tags?: string[];
    photoUrls: string[];
    status: PetStatus;
}
