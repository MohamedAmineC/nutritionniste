"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BookOpenIcon,
  FireIcon,
  ScaleIcon,
  BeakerIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { PatientData, BMICategory, Recipe, NutritionAdvice } from "../types";
import { recipes, nutritionAdvice } from "../data";

interface BMIData {
  bmi: number;
  category: BMICategory;
}

interface CalorieData {
  recommendedCalories: number;
}

export default function DashboardPage() {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [bmiData, setBmiData] = useState<BMIData | null>(null);
  const [calorieData, setCalorieData] = useState<CalorieData | null>(null);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [recommendedAdvice, setRecommendedAdvice] = useState<NutritionAdvice[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      // Get stored data
      const storedPatientData = localStorage.getItem("patientData");
      const storedBmiData = localStorage.getItem("bmiData");
      const storedCalorieData = localStorage.getItem("calorieData");
      if (!storedPatientData || !storedBmiData || !storedCalorieData) {
        toast.error(
          "Données d'évaluation non trouvées. Veuillez compléter l'évaluation d'abord.",
          {
            toastId: "assessment-data-missing",
            pauseOnFocusLoss: false,
          }
        );
        return;
      }

      // Parse stored data
      const parsedPatientData: PatientData = JSON.parse(storedPatientData);
      setPatientData(parsedPatientData);

      const parsedBmiData: BMIData = JSON.parse(storedBmiData);
      setBmiData(parsedBmiData);

      const parsedCalorieData: CalorieData = JSON.parse(storedCalorieData);
      setCalorieData(parsedCalorieData);

      // Filter recipes based on patient data
      const filteredRecipes = recipes.filter((recipe) => {
        // Filter recipes suitable for the patient's cancer type
        const matchesCancerType = recipe.suitableFor.cancerTypes.includes(
          parsedPatientData.cancerType
        );

        // If the patient has specific symptoms, prioritize recipes that address those symptoms
        const hasMatchingSymptoms = parsedPatientData.digestiveSymptoms.some(
          (symptom) => recipe.suitableFor.symptoms.includes(symptom)
        );

        return (
          matchesCancerType &&
          (parsedPatientData.digestiveSymptoms.length === 0 ||
            hasMatchingSymptoms)
        );
      });

      // Sort recipes by relevance (number of matching symptoms)
      const sortedRecipes = filteredRecipes.sort((a, b) => {
        const aMatchCount = parsedPatientData.digestiveSymptoms.filter(
          (symptom) => a.suitableFor.symptoms.includes(symptom)
        ).length;

        const bMatchCount = parsedPatientData.digestiveSymptoms.filter(
          (symptom) => b.suitableFor.symptoms.includes(symptom)
        ).length;

        return bMatchCount - aMatchCount;
      });

      setRecommendedRecipes(sortedRecipes.slice(0, 3)); // Show top 3 recipes

      // Filter nutritional advice based on patient data
      const filteredAdvice = nutritionAdvice.filter((advice) => {
        // Include general advice (no specific symptoms) or advice that matches patient symptoms
        if (!advice.forSymptoms) {
          return true;
        }

        return parsedPatientData.digestiveSymptoms.some((symptom) =>
          advice.forSymptoms?.includes(symptom)
        );
      });

      setRecommendedAdvice(filteredAdvice.slice(0, 3)); // Show top 3 pieces of advice
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Erreur lors du chargement des données.", {
        toastId: "data-loading-error",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!patientData || !bmiData || !calorieData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Données non trouvées
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Veuillez compléter l'évaluation nutritionnelle pour accéder à votre
            tableau de bord.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Aller à l'évaluation
            <ArrowLeftIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Tableau de bord nutritionnel
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Voici les résultats de votre évaluation et des recommandations
        personnalisées.
      </p>

      {/* BMI and Calorie Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* BMI Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <ScaleIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Indice de Masse Corporelle (IMC)
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {bmiData.bmi}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      Catégorie: {bmiData.category.classification}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      <span className="font-medium">Plage:</span>{" "}
                      {bmiData.category.range}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      <span className="font-medium">Risque:</span>{" "}
                      {bmiData.category.risk}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calorie Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                <FireIcon
                  className="h-6 w-6 text-orange-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Calories quotidiennes recommandées
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {calorieData.recommendedCalories} kcal
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5">
                <div className="text-sm text-gray-600">
                  <p>
                    Cette recommandation est basée sur votre sexe, poids,
                    taille, et niveau d'activité physique.
                    {patientData.hasAnorexia &&
                      " Un ajustement a été fait en raison de votre perte d'appétit signalée."}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Conseil:</span> Essayez de
                    répartir ces calories sur plusieurs petits repas tout au
                    long de la journée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Overview */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">
            Résumé du profil
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Informations personnelles et symptômes rapportés.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Genre</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {patientData.gender === "male" ? "Homme" : "Femme"}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Type de cancer digestif
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {patientData.cancerType === "colorectal" && "Cancer colorectal"}
                {patientData.cancerType === "pancreas" && "Cancer du pancréas"}
                {patientData.cancerType === "gastric" && "Cancer gastrique"}
                {patientData.cancerType === "rectum" && "Cancer du rectum"}
                {patientData.cancerType === "stomach" && "Cancer de l'estomac"}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Activité physique
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {patientData.physicalActivity === "sedentary" &&
                  "Sédentaire (peu ou pas d'exercice)"}
                {patientData.physicalActivity === "light" &&
                  "Légère (exercice léger 1-3 jours/semaine)"}
                {patientData.physicalActivity === "moderate" &&
                  "Modérée (exercice modéré 3-5 jours/semaine)"}
                {patientData.physicalActivity === "intense" &&
                  "Intense (exercice intense 6-7 jours/semaine)"}
                {patientData.physicalActivity === "very_intense" &&
                  "Très intense (exercice très intense, travail physique)"}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Perte d'appétit
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {patientData.hasAnorexia ? "Oui" : "Non"}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Symptômes digestifs
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {patientData.digestiveSymptoms.length === 0 &&
                  "Aucun symptôme rapporté"}
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {patientData.digestiveSymptoms.includes("diarrhea") && (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      Diarrhées
                    </li>
                  )}
                  {patientData.digestiveSymptoms.includes("abdominal_pain") && (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      Douleurs abdominales
                    </li>
                  )}
                  {patientData.digestiveSymptoms.includes("dry_mouth") && (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      Sécheresse buccale
                    </li>
                  )}
                  {patientData.digestiveSymptoms.includes(
                    "nausea_vomiting"
                  ) && (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      Nausées et vomissements
                    </li>
                  )}
                  {patientData.digestiveSymptoms.includes("constipation") && (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      Constipation
                    </li>
                  )}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Recommended Recipes */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Recettes recommandées
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Des recettes adaptées à vos symptômes et à votre type de cancer.
            </p>
          </div>
          <Link
            href="/recipes"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Voir toutes les recettes
            <BookOpenIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {recommendedRecipes.length > 0 ? (
              recommendedRecipes.map((recipe) => (
                <div key={recipe.id} className="p-4 sm:p-6">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <BeakerIcon
                        className="h-12 w-12 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {recipe.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.suitableFor.symptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {symptom === "diarrhea" && "Diarrhée"}
                        {symptom === "abdominal_pain" && "Douleur abdominale"}
                        {symptom === "dry_mouth" && "Sécheresse buccale"}
                        {symptom === "nausea_vomiting" && "Nausée"}
                        {symptom === "constipation" && "Constipation"}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{recipe.nutritionFacts.calories} kcal</span>
                    <span>Protéines: {recipe.nutritionFacts.protein}g</span>
                    <span>Glucides: {recipe.nutritionFacts.carbs}g</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 p-6 text-center">
                <p className="text-gray-500">
                  Aucune recette recommandée trouvée.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nutrition Advice */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">
            Conseils nutritionnels
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Recommandations pour gérer vos symptômes et prévenir la dénutrition.
          </p>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="space-y-6">
            {recommendedAdvice.length > 0 ? (
              recommendedAdvice.map((advice) => (
                <div
                  key={advice.id}
                  className="bg-gray-50 rounded-lg p-4 sm:p-6"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <LightBulbIcon
                        className="h-6 w-6 text-yellow-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {advice.title}
                      </h3>
                      <div className="text-sm text-gray-600 whitespace-pre-line">
                        {advice.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">
                  Aucun conseil nutritionnel trouvé.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Update Assessment Button */}
      <div className="mt-8 text-center">
        <Link
          href="/assessment"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          Mettre à jour votre évaluation
        </Link>
      </div>
    </div>
  );
}
