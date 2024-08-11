import { Model } from "mongoose";

export interface TUserName {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export interface TUserAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface TAcademicInformation {
    currentEducationalLevel?: 'high_school' | 'undergraduate' | 'graduate' | 'postgraduate';
    institutionName?: string;
    fieldOfStudy?: string;
    gpa?: number;
    transcripts?: string[];
};

export interface TScholarshipSpecificInformation {
    essayOrPersonalStatement: string;
    lettersOfRecommendation: string[];
    resumeOrCV: string;
};

export interface TExtracurricularActivities {
    communityServiceDescriptions?: string[];
    communityServiceHours?: number[];
    leadershipRoles?: string[];
    leadershipOrganizations?: string[];
    leadershipDurations?: string[];
    awardsAndHonors?: string[];
}

export interface TProgramSpecificRequirements {
    researchProposal?: string;
    projectDescription?: string;
    portfolio?: string[];
};

export interface TLegalAndComplianceInformation {
    proofOfIdentity: string;
    consentAndDeclarations: boolean;
};

export interface TOtherDocumentation {
    medicalRecords?: string[];
    proofOfEnrollment?: string;
};

export interface TUser {
    userName: string;
    role: 'admin' | 'moderator' | 'user';
    email: string;
    password: string;
    isDeleted: boolean;
    status: 'active' | 'blocked';
    // ----
    name: TUserName,
    nationality: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    phoneNumber: string;
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    profileImg: string;
    presentAddress: TUserAddress;
    permanentAddress: TUserAddress;
    // ----
    academicInformation?: TAcademicInformation;
    scholarshipSpecificInformation?: TScholarshipSpecificInformation;
    extracurricularActivities?: TExtracurricularActivities;
    otherDocumentation?: TOtherDocumentation;
    legalAndComplianceInformation?: TLegalAndComplianceInformation;
    programSpecificRequirements?: TProgramSpecificRequirements;
}

export interface TUserModel extends Model<TUser> {
    isPasswordMatched(
        loginPassword: string,
        registerPassword: string,
    ): Promise<boolean>;
}