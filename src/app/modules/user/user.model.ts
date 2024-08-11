import { model, Schema } from "mongoose";
import config from "../../config";
import bcrypt from 'bcrypt';
import {
    TUser,
    TUserName,
    TUserModel,
    TUserAddress,
    TOtherDocumentation,
    TAcademicInformation,
    TExtracurricularActivities,
    TProgramSpecificRequirements,
    TLegalAndComplianceInformation,
    TScholarshipSpecificInformation,
} from "./user.interface";

// Define all the sub-schemas first

const UserNameSchema = new Schema<TUserName>({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
}, { _id: false });

const UserAddressSchema = new Schema<TUserAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false });

const AcademicInformationSchema = new Schema<TAcademicInformation>({
    currentEducationalLevel: { type: String, enum: ['high_school', 'undergraduate', 'graduate', 'postgraduate'] },
    institutionName: { type: String },
    fieldOfStudy: { type: String },
    gpa: { type: Number },
    transcripts: { type: [String] },
}, { _id: false });

const ScholarshipSpecificInformationSchema = new Schema<TScholarshipSpecificInformation>({
    essayOrPersonalStatement: { type: String, required: true },
    lettersOfRecommendation: { type: [String], required: true },
    resumeOrCV: { type: String, required: true },
}, { _id: false });

const ExtracurricularActivitiesSchema = new Schema<TExtracurricularActivities>({
    communityServiceDescriptions: { type: [String] },
    communityServiceHours: { type: [Number] },
    leadershipRoles: { type: [String] },
    leadershipOrganizations: { type: [String] },
    leadershipDurations: { type: [String] },
    awardsAndHonors: { type: [String] },
}, { _id: false });

const ProgramSpecificRequirementsSchema = new Schema<TProgramSpecificRequirements>({
    researchProposal: { type: String },
    projectDescription: { type: String },
    portfolio: { type: [String] },
}, { _id: false });

const LegalAndComplianceInformationSchema = new Schema<TLegalAndComplianceInformation>({
    proofOfIdentity: { type: String, required: true },
    consentAndDeclarations: { type: Boolean, required: true },
}, { _id: false });

const OtherDocumentationSchema = new Schema<TOtherDocumentation>({
    medicalRecords: { type: [String] },
    proofOfEnrollment: { type: String },
}, { _id: false });

// Main User schema

const UserSchema = new Schema<TUser, TUserModel>({
    name: {
        type: UserNameSchema,
    },
    userName: {
        type: String,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'moderator', 'user'],
        default: 'user',
    },
    nationality: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    phoneNumber: {
        type: String,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    profileImg: {
        type: String,
    },
    presentAddress: {
        type: UserAddressSchema,
    },
    permanentAddress: {
        type: UserAddressSchema,
    },
    academicInformation: {
        type: AcademicInformationSchema,
    },
    scholarshipSpecificInformation: {
        type: ScholarshipSpecificInformationSchema,
    },
    extracurricularActivities: {
        type: ExtracurricularActivitiesSchema,
    },
    otherDocumentation: {
        type: OtherDocumentationSchema,
    },
    legalAndComplianceInformation: {
        type: LegalAndComplianceInformationSchema,
    },
    programSpecificRequirements: {
        type: ProgramSpecificRequirementsSchema,
    },
}, {
    timestamps: true, // Add timestamps (createdAt, updatedAt)
});

// hashed the password field
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.saltRounds)
    )
    next();
})

// remove the password field in the response
UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.statics.isPasswordMatched = async function (
    loginPassword,
    registerPassword,
) {
    return await bcrypt.compare(loginPassword, registerPassword);
};

const User = model<TUser, TUserModel>('User', UserSchema);

export default User;