import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet, PetStatus } from './entities/pet.entity';

@Injectable()
export class PetsService {
  private readonly pets = new Map<string, Pet>();

  constructor() {
    // Seed some initial pet data
    this.seedPets();
  }

  private seedPets() {
    const defaultPets: Pet[] = [
      {
        id: 'd3b07384-d113-4956-a5db-80d4b8d7eb8f',
        name: 'Max',
        category: 'Dogs',
        tags: ['friendly', 'vaccinated'],
        photoUrls: [
          'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
        ],
        status: PetStatus.AVAILABLE
        //status: "not-a-valid-status" as any
      },
      {
        id: '8f0a0d92-23c1-4bde-8f86-cfdf7a4fe299',
        name: 'Luna',
        category: 'Cats',
        tags: ['quiet', 'indoor'],
        photoUrls: [
          'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
        ],
        status: PetStatus.AVAILABLE,
      },
      {
        id: 'c2c62c9c-b19b-4bf2-be7f-85511b8dcbb8',
        name: 'Bubbles',
        category: 'Fish',
        tags: ['low-maintenance'],
        photoUrls: [
          'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5',
        ],
        status: PetStatus.PENDING,
      },
    ];

    defaultPets.forEach((pet) => this.pets.set(pet.id, pet));
  }

  findAll(status?: PetStatus): Pet[] {
    const allPets = Array.from(this.pets.values());
    if (status) {
      return allPets.filter((pet) => pet.status === status);
    }
    return allPets;
  }

  findOne(id: string): Pet {
    const pet = this.pets.get(id);
    if (!pet) {
      throw new NotFoundException(`Pet with ID "${id}" not found`);
    }
    return pet;
  }

  create(createPetDto: CreatePetDto): Pet {
    const pet: Pet = {
      id: randomUUID(),
      ...createPetDto,
    };
    this.pets.set(pet.id, pet);
    return pet;
  }

  update(id: string, updatePetDto: UpdatePetDto): Pet {
    const existingPet = this.findOne(id);
    const updatedPet: Pet = {
      ...existingPet,
      ...updatePetDto,
      id, // ensure ID cannot be modified
    };
    this.pets.set(id, updatedPet);
    return updatedPet;
  }

  remove(id: string): void {
    const existingPet = this.findOne(id);
    this.pets.delete(existingPet.id);
  }
}
