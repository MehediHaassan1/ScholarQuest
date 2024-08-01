import { ObjectId } from "mongoose";

export type TSubCategory = {
    name: string;
    category: ObjectId;
}