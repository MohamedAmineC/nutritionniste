// Common types for the nutritionist application

// Gender type
export type Gender = "male" | "female";

// Digestive Cancer Types
export type DigestiveCancerType =
  | "colorectal"
  | "pancreas"
  | "gastric"
  | "rectum"
  | "stomach";

// Physical Activity Levels
export type PhysicalActivity =
  | "sedentary"
  | "light"
  | "moderate"
  | "intense"
  | "very_intense";

// Digestive Symptoms
export type DigestiveSymptom =
  | "diarrhea"
  | "constipation"
  | "nausea_vomiting"
  | "abdominal_pain"
  | "bloating"
  | "dry_mouth"
  | "difficulty_swallowing"
  | "taste_changes"
  | "early_satiety";

// BMI Category
export interface BMICategory {
  range: string;
  classification: string;
  risk: string;
}

// Patient Data
export interface PatientData {
  gender: Gender;
  age: number;
  weight: number;
  height: number;
  cancerType: DigestiveCancerType;
  physicalActivity: PhysicalActivity;
  digestiveSymptoms: DigestiveSymptom[];
  hasAnorexia: boolean;
}

// Recipe model
export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutritionFacts: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  prepTime?: number; // in minutes
  cookTime?: number; // in minutes
  difficulty?: "easy" | "medium" | "hard";
  imageUrl?: string;
  suitableFor: {
    cancerTypes: DigestiveCancerType[];
    symptoms: DigestiveSymptom[];
  };
}

// Nutritional Advice
export interface NutritionAdvice {
  id: string;
  title: string;
  content: string;
  forCancerTypes?: DigestiveCancerType[];
  forSymptoms?: DigestiveSymptom[];
  priority: number; // Higher number = higher priority
  imageUrl?: string;
}
