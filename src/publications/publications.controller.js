import Publication from "../publications/publications.model.js";
import Category from "../category/category.model.js";
import Comment from "../comments/comment.model.js";

export const createPublication = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    const existingCategory = await Category.findOne({ categoryName: category });

    if (!existingCategory) {
      return res.status(404).json({ message: `La categoría no existe.` });
    }

    const filesArray = req.files.map((file) => ({
      filename: file.filename,
      url: `/public/uploads/files/${file.filename}`,
    }));

    const newPublication = new Publication({
      title,
      category: existingCategory._id,
      description,
      files: filesArray,
    });

    await newPublication.save();

    res.status(201).json({
      message: "Publicación creada exitosamente.",
      publication: newPublication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la publicación.",
      error: error.message,
    });
  }
};

export const getAllPublications = async (req, res) => {
    try {
        const publications = await Publication.find().populate('category').populate('comments');
        res.status(200).json({ message: 'Publicaciones obtenidas exitosamente', publications });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las publicaciones', error: error.message });
    }
};

export const getPublicationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const publications = await Publication.findById(id).populate("category").populate("comments");
    if (!publications) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada.",
      });
    }
    return res.status(200).json({
      success: true,
      publications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener la publicación.",
    });
  }
};


export const getPublicationsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;
        
        const category = await Category.findOne({ categoryName });

        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        const publications = await Publication.find({ category: category._id }).populate('category');

        if (publications.length === 0) {
            return res.status(404).json({ message: 'No se encontraron publicaciones para esta categoría' });
        }

        res.status(200).json({ message: 'Publicaciones obtenidas exitosamente', publications });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las publicaciones por categoría', error: error.message });
    }
};


export const updatePublication = async (req, res) => {
  try {
    const { title } = req.params;
    const { newTitle, newCategory, newDescription } = req.body;

    const category = await Category.findOne({ categoryName: newCategory });

    if (!category) {
      return res.status(404).json({ message: "La categoría no existe." });
    }

    let filesArray = [];
    if (req.files && req.files.length > 0) {
      filesArray = req.files.map((file) => ({
        filename: file.filename,
        url: `/public/uploads/files/${file.filename}`,
      }));
    } else {
      const existingPublication = await Publication.findOne({ title });
      if (existingPublication) {
        filesArray = existingPublication.files;
      }
    }

    const updateData = {
      title: newTitle || title,
      category: category._id,
      description: newDescription || undefined,
      files: filesArray
    };
    const updatedPublication = await Publication.findOneAndUpdate(
      { title },
      updateData,
      { new: true, runValidators: true }
    ).populate("category").populate("comments");

    if (!updatedPublication) {
      return res.status(404).json({ message: "Publicación no encontrada." });
    }

    res.status(200).json({
      message: "Publicación actualizada exitosamente.",
      publication: updatedPublication,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Error al actualizar la publicación.",
      error: error.message,
    });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { title } = req.params;

    const deletedPublication = await Publication.findOneAndDelete({ title });

    if (!deletedPublication) {
      return res.status(404).json({ message: "Publicación no encontrada." });
    }

    await Comment.deleteMany({ publication: deletedPublication._id });

    res.status(200).json({
      message: "Publicación eliminada exitosamente.",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Error al eliminar la publicación.",
      error: error.message,
    });
  }
};

