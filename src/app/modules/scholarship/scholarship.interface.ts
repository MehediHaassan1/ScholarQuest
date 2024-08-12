export interface TScholarship {
    scholarshipName: string;
    universityName: string;
    universityImage: string;
    universityCountry: string;
    universityCity: string;
    universityWorldRank: number;
    scholarshipCategory: 'Merit' | "Need" | "Research";
    subjectCategory: 'Engineering' | 'Business and Management' | 'Arts and Humanities' | 'Social Science' | 'Law and Legal Studies';
    degree: string;
    tuitionFees: number;
    applicationFees: number;
    serviceCharge: number;
    applicationDeadline: Date;
    postDate: Date;
    postedBy: string;
}
