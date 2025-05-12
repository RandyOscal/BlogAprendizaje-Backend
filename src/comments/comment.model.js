import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "El nombre de usuario es obligatorio"],
        },
        publication: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, "La publicación es obligatoria"],
        },
        description: {
            type: String,
            required: [true, "La descripción es obligatoria"],
        },
        date: { 
            type: Date, 
            default: Date.now 
        }
    },
);

export default model("Comment", commentSchema);