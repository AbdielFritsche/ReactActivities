import mongoose from "mongoose";


const itemSchema = mongoose.Schema({
    name: { type: String, unique: true, trim: true },
    value: { type: Number, default: 0 },
}, { timestamps: true });

const itemModel = mongoose.model("Item", itemSchema);
export default itemModel;