import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { Pet, PetStatus } from '../src/pets/entities/pet.entity';

describe('PetsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /pets', () => {
    it('should return all pets', async () => {
      const response = await request(app.getHttpServer())
        .get('/pets')
        .expect(200);

      const body = response.body as Pet[];
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(3);
    });

    it('should filter pets by status', async () => {
      const response = await request(app.getHttpServer())
        .get('/pets?status=available')
        .expect(200);

      const body = response.body as Pet[];
      expect(body.length).toBe(2);
      expect(body.every((p) => p.status === PetStatus.AVAILABLE)).toBe(true);
    });
  });

  describe('GET /pets/:id', () => {
    it('should return a pet by ID', async () => {
      const id = 'd3b07384-d113-4956-a5db-80d4b8d7eb8f';
      const response = await request(app.getHttpServer())
        .get(`/pets/${id}`)
        .expect(200);

      const body = response.body as Pet;
      expect(body.id).toBe(id);
      expect(body.name).toBe('Max');
    });

    it('should return 404 for non-existent pet ID', async () => {
      await request(app.getHttpServer())
        .get('/pets/non-existent-id')
        .expect(404);
    });
  });

  describe('POST /pets', () => {
    it('should create a new pet when valid data is provided', async () => {
      const newPet = {
        name: 'Coco',
        category: 'Birds',
        tags: ['singer'],
        photoUrls: ['https://example.com/coco.jpg'],
        status: PetStatus.AVAILABLE,
      };

      const response = await request(app.getHttpServer())
        .post('/pets')
        .send(newPet)
        .expect(201);

      const body = response.body as Pet;
      expect(body.id).toBeDefined();
      expect(body.name).toBe('Coco');
    });

    it('should fail with 400 when invalid status is provided', async () => {
      const invalidPet = {
        name: 'Coco',
        photoUrls: ['https://example.com/coco.jpg'],
        status: 'super-available', // Invalid status
      };

      await request(app.getHttpServer())
        .post('/pets')
        .send(invalidPet)
        .expect(400);
    });

    it('should fail with 400 when required fields are missing', async () => {
      const incompletePet = {
        name: 'Coco',
        // missing status and photoUrls
      };

      await request(app.getHttpServer())
        .post('/pets')
        .send(incompletePet)
        .expect(400);
    });
  });

  describe('PATCH /pets/:id', () => {
    it('should update an existing pet', async () => {
      const id = 'd3b07384-d113-4956-a5db-80d4b8d7eb8f';
      const response = await request(app.getHttpServer())
        .patch(`/pets/${id}`)
        .send({ name: 'Maximus', status: PetStatus.SOLD })
        .expect(200);

      const body = response.body as Pet;
      expect(body.name).toBe('Maximus');
      expect(body.status).toBe(PetStatus.SOLD);
    });

    it('should return 404 for updating a non-existent pet', async () => {
      await request(app.getHttpServer())
        .patch('/pets/non-existent-id')
        .send({ name: 'Maximus' })
        .expect(404);
    });
  });

  describe('DELETE /pets/:id', () => {
    it('should delete an existing pet and return 204', async () => {
      const id = 'd3b07384-d113-4956-a5db-80d4b8d7eb8f';
      await request(app.getHttpServer()).delete(`/pets/${id}`).expect(204);

      // Verify it is deleted
      await request(app.getHttpServer()).get(`/pets/${id}`).expect(404);
    });

    it('should return 404 for deleting a non-existent pet', async () => {
      await request(app.getHttpServer())
        .delete('/pets/non-existent-id')
        .expect(404);
    });
  });
});
