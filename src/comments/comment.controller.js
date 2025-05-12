import Comment from "../comments/comment.model.js";
import Publication from "../publications/publications.model.js";

export const createComment = async (req, res) => {
    try {
        const { username, publicationId, description } = req.body;

        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: `No se encontró una publicación con el ID: ${publicationId}`,
            });
        }

        const newComment = new Comment({
            username,
            publication: publication._id,
            description
        });

        const savedComment = await newComment.save();

        publication.comments.push(savedComment._id);
        await publication.save();

        return res.status(201).json({
            success: true,
            message: "Comentario creado exitosamente",
            comment: savedComment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error al crear el comentario",
            error: error.message,
        });
    }
};
