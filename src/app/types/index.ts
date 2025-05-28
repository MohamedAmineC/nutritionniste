export type Gender = "male" | "female";

export type DigestiveCancerType =
  | "colorectal"
  | "pancreas"
  | "gastric"
  | "rectum"
  | "stomach";

export type PhysicalActivity =
  | "sedentary"
  | "light"
  | "moderate"
  | "intense"
  | "very_intense";

export type DigestiveSymptom =
  | "diarrhea"
  | "abdominal_pain"
  | "dry_mouth"
  | "nausea_vomiting"
  | "constipation";

export interface PatientData {
  gender: Gender;
  cancerType: DigestiveCancerType;
  weight: number; // in kg
  height: number; // in cm
  physicalActivity: PhysicalActivity;
  hasAnorexia: boolean;
  digestiveSymptoms: DigestiveSymptom[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  nutritionFacts: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  suitableFor: {
    symptoms: DigestiveSymptom[];
    cancerTypes: DigestiveCancerType[];
  };
}

export interface NutritionAdvice {
  id: string;
  title: string;
  content: string;
  forSymptoms?: DigestiveSymptom[];
  forCancerTypes?: DigestiveCancerType[];
  imageUrl?: string;
  priority: number; // Higher number = higher priority
}

export interface BMICategory {
  range: string;
  classification: string;
  risk: string;
}
