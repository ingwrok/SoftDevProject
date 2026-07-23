import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PetStatus } from './entities/pet.entity';
import { PetsService } from './pets.service';

describe('PetsService', () => {
  let service: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsService],
    }).compile();

    service = module.get<PetsService>(PetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all pets by default', () => {
      const pets = service.findAll();
      expect(pets.length).toBe(3);
      expect(pets[0].name).toBe('Max');
    });

    it('should filter pets by status', () => {
      const availablePets = service.findAll(PetStatus.AVAILABLE);
      expect(availablePets.length).toBe(2);
      expect(availablePets.every((p) => p.status === PetStatus.AVAILABLE)).toBe(
        true,
      );

      const pendingPets = service.findAll(PetStatus.PENDING);
      expect(pendingPets.length).toBe(1);
      expect(pendingPets[0].name).toBe('Bubbles');
    });
  });

  describe('findOne', () => {
    it('should return a pet by ID', () => {
      const pet = service.findOne('d3b07384-d113-4956-a5db-80d4b8d7eb8f');
      expect(pet).toBeDefined();
      expect(pet.name).toBe('Max');
    });

    it('should throw NotFoundException if pet does not exist', () => {
      expect(() => service.findOne('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new pet with generated UUID', () => {
      const newPetDto = {
        name: 'Buddy',
        category: 'Dogs',
        tags: ['friendly'],
        photoUrls: ['https://example.com/buddy.jpg'],
        status: PetStatus.AVAILABLE,
      };

      const pet = service.create(newPetDto);
      expect(pet.id).toBeDefined();
      expect(pet.name).toBe('Buddy');
      expect(service.findAll().length).toBe(4);
    });
  });

  describe('update', () => {
    it('should update an existing pet', () => {
      const pet = service.update('d3b07384-d113-4956-a5db-80d4b8d7eb8f', {
        name: 'Maximus',
        status: PetStatus.SOLD,
      });

      expect(pet.name).toBe('Maximus');
      expect(pet.status).toBe(PetStatus.SOLD);

      const retrieved = service.findOne('d3b07384-d113-4956-a5db-80d4b8d7eb8f');
      expect(retrieved.name).toBe('Maximus');
    });

    it('should throw NotFoundException if trying to update non-existent pet', () => {
      expect(() =>
        service.update('non-existent-id', { name: 'Nobody' }),
      ).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an existing pet', () => {
      service.remove('d3b07384-d113-4956-a5db-80d4b8d7eb8f');
      expect(() =>
        service.findOne('d3b07384-d113-4956-a5db-80d4b8d7eb8f'),
      ).toThrow(NotFoundException);
      expect(service.findAll().length).toBe(2);
    });

    it('should throw NotFoundException if trying to remove non-existent pet', () => {
      expect(() => service.remove('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });
});
