import { BMICategory } from "../types";

export function calculateBMI(weight: number, height: number): number {
  // height in cm converted to meters
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 16) {
    return {
      range: "< 16",
      classification: "Dénutrition sévère",
      risk: "Risque très élevé de complications",
    };
  } else if (bmi >= 16 && bmi < 17) {
    return {
      range: "16 - 16.9",
      classification: "Dénutrition modérée",
      risk: "Risque élevé de complications",
    };
  } else if (bmi >= 17 && bmi < 18.5) {
    return {
      range: "17 - 18.4",
      classification: "Dénutrition légère",
      risk: "Risque de complications",
    };
  } else if (bmi >= 18.5 && bmi < 25) {
    return {
      range: "18.5 - 24.9",
      classification: "Normal",
      risk: "Risque faible",
    };
  } else if (bmi >= 25 && bmi < 30) {
    return {
      range: "25 - 29.9",
      classification: "Surpoids",
      risk: "Risque augmenté",
    };
  } else if (bmi >= 30 && bmi < 35) {
    return {
      range: "30 - 34.9",
      classification: "Obésité modérée (Classe I)",
      risk: "Risque élevé",
    };
  } else if (bmi >= 35 && bmi < 40) {
    return {
      range: "35 - 39.9",
      classification: "Obésité sévère (Classe II)",
      risk: "Risque très élevé",
    };
  } else {
    return {
      range: "≥ 40",
      classification: "Obésité morbide (Classe III)",
      risk: "Risque extrêmement élevé",
    };
  }
}

export function getRecommendedCalories(
  gender: "male" | "female",
  weight: number,
  height: number,
  physicalActivity: string,
  hasAnorexia: boolean
): number {
  // Simple Harris-Benedict equation for base metabolic rate
  const heightInCm = height;
  let bmr = 0;

  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * heightInCm - 5.677 * 40; // Assuming average age of 40
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * heightInCm - 4.33 * 40; // Assuming average age of 40
  }

  // Activity multiplier
  let activityMultiplier = 1.2; // Default to sedentary

  switch (physicalActivity) {
    case "sedentary":
      activityMultiplier = 1.2;
      break;
    case "light":
      activityMultiplier = 1.375;
      break;
    case "moderate":
      activityMultiplier = 1.55;
      break;
    case "intense":
      activityMultiplier = 1.725;
      break;
    case "very_intense":
      activityMultiplier = 1.9;
      break;
  }

  // Calculate total daily energy expenditure
  let tdee = bmr * activityMultiplier;

  // If the patient has anorexia, increase recommended calories to help with weight gain
  if (hasAnorexia) {
    tdee += 300; // Additional calories for recovery
  }

  return Math.round(tdee);
}
