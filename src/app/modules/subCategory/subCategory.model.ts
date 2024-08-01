import { Schema, model, Types } from 'mongoose';

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true,
    },
});

const SubCategory = model('SubCategory', subCategorySchema);

export default SubCategory;
