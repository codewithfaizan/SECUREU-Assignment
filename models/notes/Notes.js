import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema(
    {
        title: { type: String, required: true, maxlength: 50 },
        description: { type: String, maxlength: 150 },
        hastags: { type: String, maxlength: 50 },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: '_id'
        },
    }, { timestamps: true }
);

notesSchema.index({ title: 'text' })

export default mongoose.model("Notes", notesSchema, "Notes");