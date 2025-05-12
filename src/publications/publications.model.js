import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "El título es obligatorio"],
        },
        category: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Category',
            required: [true, "La categoría es obligatoria"],
        },
        description: {
            type: String,
            required: [true, "La descripción es obligatoria"],
        },
        date: {
            type: Date,
            default: Date.now,
        },
        files: [
      {
        filename: { type: String, required: true },
        url: { type: String, required: true },
      }
    ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            }
        ]
    }
);

export default mongoose.model("Publication", publicationSchema);
