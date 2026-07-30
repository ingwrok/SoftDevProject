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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_pet_dto_1 = require("./dto/create-pet.dto");
const update_pet_dto_1 = require("./dto/update-pet.dto");
const pet_entity_1 = require("./entities/pet.entity");
const pets_service_1 = require("./pets.service");
let PetsController = class PetsController {
    petsService;
    constructor(petsService) {
        this.petsService = petsService;
    }
    findAll(status) {
        return this.petsService.findAll(status);
    }
    findOne(id) {
        return this.petsService.findOne(id);
    }
    create(createPetDto) {
        return this.petsService.create(createPetDto);
    }
    update(id, updatePetDto) {
        return this.petsService.update(id, updatePetDto);
    }
    remove(id) {
        return this.petsService.remove(id);
    }
};
exports.PetsController = PetsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all pets',
        description: 'Retrieve a list of all pets in the store. Optionally filter by status.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: pet_entity_1.PetStatus,
        description: 'Filter pets by availability status',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [pet_entity_1.Pet], description: 'Returns the list of pets.' }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], PetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find a pet by ID',
        description: 'Retrieve a specific pet details by its unique identifier.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: pet_entity_1.Pet,
        description: 'The pet has been successfully found.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Pet with specified ID was not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", pet_entity_1.Pet)
], PetsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Add a new pet',
        description: 'Add a new pet to the store.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: pet_entity_1.Pet,
        description: 'The pet has been successfully created.',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data provided.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pet_dto_1.CreatePetDto]),
    __metadata("design:returntype", pet_entity_1.Pet)
], PetsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update an existing pet',
        description: 'Update details of an existing pet by ID.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: pet_entity_1.Pet,
        description: 'The pet has been successfully updated.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Pet with specified ID was not found.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data provided.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pet_dto_1.UpdatePetDto]),
    __metadata("design:returntype", pet_entity_1.Pet)
], PetsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove a pet',
        description: 'Delete a pet from the store by ID.',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'The pet has been successfully removed.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Pet with specified ID was not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PetsController.prototype, "remove", null);
exports.PetsController = PetsController = __decorate([
    (0, swagger_1.ApiTags)('pets'),
    (0, common_1.Controller)('pets'),
    __metadata("design:paramtypes", [pets_service_1.PetsService])
], PetsController);
//# sourceMappingURL=pets.controller.js.map