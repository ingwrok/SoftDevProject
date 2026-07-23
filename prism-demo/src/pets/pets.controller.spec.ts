import { Test, TestingModule } from '@nestjs/testing';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetStatus } from './entities/pet.entity';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

const mockPets = [
  {
    id: 'd3b07384-d113-4956-a5db-80d4b8d7eb8f',
    name: 'Max',
    category: 'Dogs',
    tags: ['friendly'],
    photoUrls: ['https://example.com/max.jpg'],
    status: PetStatus.AVAILABLE,
  },
  {
    id: '8f0a0d92-23c1-4bde-8f86-cfdf7a4fe299',
    name: 'Luna',
    category: 'Cats',
    tags: ['quiet'],
    photoUrls: ['https://example.com/luna.jpg'],
    status: PetStatus.AVAILABLE,
  },
];

describe('PetsController', () => {
  let controller: PetsController;
  let service: PetsService;
  let findAllMock: jest.Mock;
  let findOneMock: jest.Mock;
  let createMock: jest.Mock;
  let updateMock: jest.Mock;
  let removeMock: jest.Mock;

  beforeEach(async () => {
    findAllMock = jest.fn().mockReturnValue(mockPets);
    findOneMock = jest.fn().mockImplementation((id: string) => {
      const pet = mockPets.find((p) => p.id === id);
      if (!pet) return null;
      return pet;
    });
    createMock = jest.fn().mockImplementation((dto: CreatePetDto) => ({
      id: 'new-id',
      ...dto,
    }));
    updateMock = jest
      .fn()
      .mockImplementation((id: string, dto: UpdatePetDto) => ({
        id,
        ...mockPets[0],
        ...dto,
      }));
    removeMock = jest.fn().mockReturnValue(undefined);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [
        {
          provide: PetsService,
          useValue: {
            findAll: findAllMock,
            findOne: findOneMock,
            create: createMock,
            update: updateMock,
            remove: removeMock,
          },
        },
      ],
    }).compile();

    controller = module.get<PetsController>(PetsController);
    service = module.get<PetsService>(PetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all pets', () => {
      const result = controller.findAll();
      expect(result).toEqual(mockPets);
      expect(findAllMock).toHaveBeenCalledWith(undefined);
    });

    it('should pass status query param to service', () => {
      controller.findAll(PetStatus.AVAILABLE);
      expect(findAllMock).toHaveBeenCalledWith(PetStatus.AVAILABLE);
    });
  });

  describe('findOne', () => {
    it('should return a single pet', () => {
      const id = 'd3b07384-d113-4956-a5db-80d4b8d7eb8f';
      const result = controller.findOne(id);
      expect(result).toEqual(mockPets[0]);
      expect(findOneMock).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create and return a new pet', () => {
      const dto: CreatePetDto = {
        name: 'Rocky',
        category: 'Dogs',
        tags: ['active'],
        photoUrls: ['https://example.com/rocky.jpg'],
        status: PetStatus.AVAILABLE,
      };
      const result = controller.create(dto);
      expect(result).toEqual({ id: 'new-id', ...dto });
      expect(createMock).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update and return the pet', () => {
      const id = 'd3b07384-d113-4956-a5db-80d4b8d7eb8f';
      const dto: UpdatePetDto = { name: 'Maximus' };
      const result = controller.update(id, dto);
      expect(result.name).toBe('Maximus');
      expect(updateMock).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should call service.remove and return undefined', () => {
      const id = 'd3b07384-d113-4956-a5db-80d4b8d7eb8f';
      const result = controller.remove(id);
      expect(result).toBeUndefined();
      expect(removeMock).toHaveBeenCalledWith(id);
    });
  });
});
