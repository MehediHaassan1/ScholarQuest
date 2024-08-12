import { Schema, model, Types } from 'mongoose';

const DegreeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    subjectCategory: {
        type: Types.ObjectId,
        ref: 'SubjectCategory',
        required: true,
    },
});

const Degree = model('Degree', DegreeSchema);

export default Degree;
