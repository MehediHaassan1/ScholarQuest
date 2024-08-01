import { Schema, model, Types } from "mongoose";
import { TScholarship } from "./scholarship.interface";

const ScholarshipSchema = new Schema<TScholarship>({
    scholarshipName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    scholarshipDescription: {
        type: String,
        required: true,
        maxlength: 1000
    },
    universityName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    universityImage: {
        type: String,
        required: true
    },
    universityCountry: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    universityCity: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    universityWorldRank: {
        type: Number,
        required: true,
        min: 1
    },
    scholarshipCategory: {
        type: String,
        enum: ['Merit', 'Need', 'Research'],
        required: true
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory: {
        type: Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    degree: {
        type: String,
        enum: ['Bachelor', 'Master', 'Doctor of Philosophy'],
        required: true
    },
    tuitionFees: {
        type: Number,
        required: true,
        min: 1000
    },
    applicationFees: {
        type: Number,
        required: true,
        min: 50
    },
    serviceCharge: {
        type: Number,
        required: true,
        min: 10
    },
    applicationDeadline: {
        type: String,
        required: true
    },
    postDate: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

// Query Middleware
ScholarshipSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

ScholarshipSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});


export const Scholarship = model<TScholarship>('Scholarship', ScholarshipSchema);
