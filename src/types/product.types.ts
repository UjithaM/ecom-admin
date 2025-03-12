export type Product = {
    id: string;
    name: string;
    description?: string;
    price?: number;
    soldOut?: boolean;
    stock?: number;
    category?: string;
}