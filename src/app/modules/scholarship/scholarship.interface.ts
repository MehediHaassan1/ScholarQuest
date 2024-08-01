import { ObjectId } from "mongoose";

export interface TScholarship {
    scholarshipName: string;
    scholarshipDescription: string;
    universityName: string;
    universityImage: string;
    universityCountry: string;
    universityCity: string;
    universityWorldRank: number;
    scholarshipCategory: 'Merit' | "Need" | "Research";
    category: ObjectId;
    subCategory: ObjectId;
    degree: "Bachelor" | "Master" | "Doctor of Philosophy";
    tuitionFees: number;
    applicationFees: number;
    serviceCharge: number;
    applicationDeadline: string;
    postDate: string;
    postedBy: string;
    isDeleted: boolean;
}
