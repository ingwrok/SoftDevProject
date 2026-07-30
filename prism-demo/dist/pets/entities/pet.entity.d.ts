export declare enum PetStatus {
    AVAILABLE = "available",
    PENDING = "pending",
    SOLD = "sold"
}
export declare class Pet {
    id: string;
    name: string;
    category?: string;
    tags?: string[];
    photoUrls: string[];
    status: PetStatus;
}
