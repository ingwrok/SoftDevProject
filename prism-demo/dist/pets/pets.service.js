"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const pet_entity_1 = require("./entities/pet.entity");
let PetsService = class PetsService {
    pets = new Map();
    constructor() {
        this.seedPets();
    }
    seedPets() {
        const defaultPets = [
            {
                id: 'd3b07384-d113-4956-a5db-80d4b8d7eb8f',
                name: 'Max',
                category: 'Dogs',
                tags: ['friendly', 'vaccinated'],
                photoUrls: [
                    'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
                ],
                status: "not-a-valid-status"
            },
            {
                id: '8f0a0d92-23c1-4bde-8f86-cfdf7a4fe299',
                name: 'Luna',
                category: 'Cats',
                tags: ['quiet', 'indoor'],
                photoUrls: [
                    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
                ],
                status: pet_entity_1.PetStatus.AVAILABLE,
            },
            {
                id: 'c2c62c9c-b19b-4bf2-be7f-85511b8dcbb8',
                name: 'Bubbles',
                category: 'Fish',
                tags: ['low-maintenance'],
                photoUrls: [
                    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5',
                ],
                status: pet_entity_1.PetStatus.PENDING,
            },
        ];
        defaultPets.forEach((pet) => this.pets.set(pet.id, pet));
    }
    findAll(status) {
        const allPets = Array.from(this.pets.values());
        if (status) {
            return allPets.filter((pet) => pet.status === status);
        }
        return allPets;
    }
    findOne(id) {
        const pet = this.pets.get(id);
        if (!pet) {
            throw new common_1.NotFoundException(`Pet with ID "${id}" not found`);
        }
        return pet;
    }
    create(createPetDto) {
        const pet = {
            id: (0, crypto_1.randomUUID)(),
            ...createPetDto,
        };
        this.pets.set(pet.id, pet);
        return pet;
    }
    update(id, updatePetDto) {
        const existingPet = this.findOne(id);
        const updatedPet = {
            ...existingPet,
            ...updatePetDto,
            id,
        };
        this.pets.set(id, updatedPet);
        return updatedPet;
    }
    remove(id) {
        const existingPet = this.findOne(id);
        this.pets.delete(existingPet.id);
    }
};
exports.PetsService = PetsService;
exports.PetsService = PetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PetsService);
//# sourceMappingURL=pets.service.js.map