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
exports.CreatePetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pet_entity_1 = require("../entities/pet.entity");
class CreatePetDto {
    name;
    category;
    tags;
    photoUrls;
    status;
}
exports.CreatePetDto = CreatePetDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the pet',
        example: 'Max',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePetDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The category of the pet',
        example: 'Dogs',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePetDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tags associated with the pet',
        example: ['friendly', 'vaccinated'],
        type: [String],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreatePetDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URLs to photos of the pet',
        example: ['https://example.com/pet/max.jpg'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUrl)({}, { each: true }),
    __metadata("design:type", Array)
], CreatePetDto.prototype, "photoUrls", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The availability status of the pet',
        enum: pet_entity_1.PetStatus,
        example: pet_entity_1.PetStatus.AVAILABLE,
    }),
    (0, class_validator_1.IsEnum)(pet_entity_1.PetStatus),
    __metadata("design:type", String)
], CreatePetDto.prototype, "status", void 0);
//# sourceMappingURL=create-pet.dto.js.map