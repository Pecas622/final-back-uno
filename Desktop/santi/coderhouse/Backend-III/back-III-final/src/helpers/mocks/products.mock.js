import { faker } from "@faker-js/faker";
faker.locale = 'es';

const createMockProduct = () => {
    const categories = [
        "Mates",
        "Bombillas",
        "Yerbas",
        "Termos",
        "Accesorios"
    ];
    const title = faker.commerce.productName() + " de " + faker.commerce.productMaterial();
    const description = faker.commerce.productDescription();
    const category = categories[faker.number.int({ min: 0, max: categories.length - 1 })];
    const image = faker.image.urlPicsumPhotos({ width: 360, height: 360 }); // Imagen random
    const price = faker.number.int({ min: 800, max: 15000 });
    const stock = faker.number.int({ min: 5, max: 100 });

    return { title, description, category, image, price, stock };
};

export default createMockProduct;
