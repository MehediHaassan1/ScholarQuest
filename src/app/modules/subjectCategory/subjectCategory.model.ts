import { Schema, model } from 'mongoose';

const SubjectCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
});

const SubjectCategory = model('SubjectCategory', SubjectCategorySchema);

export default SubjectCategory;
