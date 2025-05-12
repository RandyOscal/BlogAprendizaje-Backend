import Category from './category.model.js';

export const initCategories = async () => {
    const defaultCategories = ["Taller III", "Tecnologia III", "Practica Supervisada"];

    try {
        for (const categoryName of defaultCategories) {
            const existingCategory = await Category.findOne({ categoryName });
            if (!existingCategory) {
                const category = new Category({ categoryName });
                await category.save();
                console.log(`Categoría ${categoryName} creada`);
            } else {
                console.log(`La categoría ${categoryName} ya existe`);
            }
        }
    } catch (error) {
        console.error('Error al crear categorías:', error);
    }
};

export default initCategories;