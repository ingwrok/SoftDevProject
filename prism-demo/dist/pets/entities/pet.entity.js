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
exports.Pet = exports.PetStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
var PetStatus;
(function (PetStatus) {
    PetStatus["AVAILABLE"] = "available";
    PetStatus["PENDING"] = "pending";
    PetStatus["SOLD"] = "sold";
})(PetStatus || (exports.PetStatus = PetStatus = {}));
class Pet {
    id;
    name;
    category;
    tags;
    photoUrls;
    status;
}
exports.Pet = Pet;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the pet',
        example: 'd3b07384-d113-4956-a5db-80d4b8d7eb8f',
    }),
    __metadata("design:type", String)
], Pet.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the pet',
        example: 'Max',
    }),
    __metadata("design:type", String)
], Pet.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The category of the pet',
        example: 'Dogs',
        required: false,
    }),
    __metadata("design:type", String)
], Pet.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tags associated with the pet',
        example: ['friendly', 'vaccinated'],
        type: [String],
        required: false,
    }),
    __metadata("design:type", Array)
], Pet.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URLs to photos of the pet',
        example: ['https://example.com/pet/max.jpg'],
        type: [String],
    }),
    __metadata("design:type", Array)
], Pet.prototype, "photoUrls", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The availability status of the pet',
        enum: PetStatus,
        example: PetStatus.AVAILABLE,
    }),
    __metadata("design:type", String)
], Pet.prototype, "status", void 0);
//# sourceMappingURL=pet.entity.js.map