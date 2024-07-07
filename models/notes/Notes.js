import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema(
    {
        title: { type: String, required: true, maxlength: 50 },
        content: { type: String, maxlength: 150 },
        hastags: { type: String, maxlength: 50 },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdOn: { type: Date, default: Date.now }
    }
);

notesSchema.index({ createdBy: 1, title: 1 }, { unique: true })

export default mongoose.model("Notes", notesSchema, "Notes");