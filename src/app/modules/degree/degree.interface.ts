import { ObjectId } from "mongoose";

export type TDegree = {
    name: string;
    subjectCategory: ObjectId;
}