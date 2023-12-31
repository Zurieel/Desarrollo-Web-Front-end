import { ProductImage } from "./product-image";

export class Product{
    product_id: number = 0;
    product: string = "";
    gtin: string = "";
    description: string = "";
    price: number = 0;
    stock: number = 0;
    category_id: number = 0;
    image: ProductImage = new ProductImage();
    status: number = 0;
}