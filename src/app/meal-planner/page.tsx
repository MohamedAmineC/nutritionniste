"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  CalendarDaysIcon,
  PlusCircleIcon,
  ArrowPathIcon,
  XMarkIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Recipe, DigestiveSymptom, PatientData } from "../types";
import { recipes } from "../data";

type MealPlanDay = {
  id: string;
  day: string;
  meals: {
    breakfast: Recipe | null;
    lunch: Recipe | null;
    dinner: Recipe | null;
    snacks: Recipe[];
  };
  notes: string;
};

type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

export default function MealPlannerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [showRecipeSelector, setShowRecipeSelector] = useState<boolean>(false);
  const [activeMealType, setActiveMealType] = useState<MealType>("breakfast");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  useEffect(() => {
    const initializeMealPlan = () => {
      try {
        // Get stored patient data
        const storedPatientData = localStorage.getItem("patientData");

        if (!storedPatientData) {
          toast.error(
            "Veuillez compléter l'évaluation avant d'utiliser le planificateur de repas.",
            {
              toastId: "meal-planner-assessment-missing",
            }
          );
          return;
        }

        const parsedPatientData: PatientData = JSON.parse(storedPatientData);
        setPatientData(parsedPatientData);

        // Try to load existing meal plan
        const storedMealPlan = localStorage.getItem("mealPlan");

        if (storedMealPlan) {
          setMealPlan(JSON.parse(storedMealPlan));
        } else {
          // Create a new meal plan structure
          const newMealPlan = daysOfWeek.map((day, index) => ({
            id: `day-${index}`,
            day,
            meals: {
              breakfast: null,
              lunch: null,
              dinner: null,
              snacks: [],
            },
            notes: "",
          }));

          setMealPlan(newMealPlan);
        }
      } catch (error) {
        console.error("Error initializing meal plan:", error);
        toast.error(
          "Une erreur s'est produite lors du chargement du planificateur de repas.",
          {
            toastId: "meal-planner-loading-error",
          }
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeMealPlan();
  }, []);

  useEffect(() => {
    // When patient data changes or a new meal type is selected, update filtered recipes
    if (patientData) {
      let filtered = [...recipes];

      // Filter recipes suitable for the patient's cancer type
      filtered = filtered.filter((recipe) =>
        recipe.suitableFor.cancerTypes.includes(patientData.cancerType)
      );

      // Filter by symptom if available
      if (patientData.digestiveSymptoms.length > 0) {
        filtered = filtered.filter((recipe) =>
          patientData.digestiveSymptoms.some((symptom) =>
            recipe.suitableFor.symptoms.includes(symptom)
          )
        );
      }

      // Filter by search term if available
      if (searchTerm) {
        filtered = filtered.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredRecipes(filtered);
    }
  }, [patientData, activeMealType, searchTerm]);

  // Save meal plan to localStorage whenever it changes
  useEffect(() => {
    if (mealPlan.length > 0) {
      localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
    }
  }, [mealPlan]);

  const handleMealSelection = (meal: Recipe) => {
    setMealPlan((prev) => {
      const updatedPlan = [...prev];
      const currentMealPlan = { ...updatedPlan[currentDay] };

      if (activeMealType === "snacks") {
        // For snacks, add to the array
        currentMealPlan.meals = {
          ...currentMealPlan.meals,
          snacks: [...currentMealPlan.meals.snacks, meal],
        };
      } else {
        // For other meal types, replace the current selection
        currentMealPlan.meals = {
          ...currentMealPlan.meals,
          [activeMealType]: meal,
        };
      }

      updatedPlan[currentDay] = currentMealPlan;
      return updatedPlan;
    });

    setShowRecipeSelector(false);
    toast.success("Repas ajouté au plan");
  };

  const handleRemoveMeal = (mealType: MealType, index: number = -1) => {
    setMealPlan((prev) => {
      const updatedPlan = [...prev];
      const currentMealPlan = { ...updatedPlan[currentDay] };

      if (mealType === "snacks" && index !== -1) {
        // For snacks, remove the specific one at index
        const updatedSnacks = [...currentMealPlan.meals.snacks];
        updatedSnacks.splice(index, 1);

        currentMealPlan.meals = {
          ...currentMealPlan.meals,
          snacks: updatedSnacks,
        };
      } else {
        // For other meal types, set to null
        currentMealPlan.meals = {
          ...currentMealPlan.meals,
          [mealType]: null,
        };
      }

      updatedPlan[currentDay] = currentMealPlan;
      return updatedPlan;
    });

    toast.success("Repas retiré du plan");
  };

  const handleSaveNotes = () => {
    setMealPlan((prev) => {
      const updatedPlan = [...prev];
      updatedPlan[currentDay] = {
        ...updatedPlan[currentDay],
        notes: notes,
      };
      return updatedPlan;
    });

    toast.success("Notes enregistrées");
  };

  const openMealSelector = (mealType: MealType) => {
    setActiveMealType(mealType);
    setShowRecipeSelector(true);
  };

  const calculateDailyNutrition = () => {
    const currentMeals = mealPlan[currentDay]?.meals;
    if (!currentMeals)
      return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };

    let totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };

    if (currentMeals.breakfast) {
      const { calories, protein, carbs, fat, fiber } =
        currentMeals.breakfast.nutritionFacts;
      totals.calories += calories;
      totals.protein += protein;
      totals.carbs += carbs;
      totals.fat += fat;
      totals.fiber += fiber;
    }

    if (currentMeals.lunch) {
      const { calories, protein, carbs, fat, fiber } =
        currentMeals.lunch.nutritionFacts;
      totals.calories += calories;
      totals.protein += protein;
      totals.carbs += carbs;
      totals.fat += fat;
      totals.fiber += fiber;
    }

    if (currentMeals.dinner) {
      const { calories, protein, carbs, fat, fiber } =
        currentMeals.dinner.nutritionFacts;
      totals.calories += calories;
      totals.protein += protein;
      totals.carbs += carbs;
      totals.fat += fat;
      totals.fiber += fiber;
    }

    currentMeals.snacks.forEach((snack) => {
      const { calories, protein, carbs, fat, fiber } = snack.nutritionFacts;
      totals.calories += calories;
      totals.protein += protein;
      totals.carbs += carbs;
      totals.fat += fat;
      totals.fiber += fiber;
    });

    return totals;
  };

  const printMealPlan = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Données non trouvées
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Veuillez compléter l'évaluation nutritionnelle pour accéder au
            planificateur de repas.
          </p>
          <a
            href="/assessment"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Aller à l'évaluation
          </a>
        </div>
      </div>
    );
  }

  const dailyNutrition = calculateDailyNutrition();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Planificateur de repas
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Organisez vos repas de la semaine avec des recettes adaptées à votre
        condition.
      </p>

      {/* Day Selection */}
      <div className="mb-6">
        <div className="flex overflow-x-auto py-2 hide-scrollbar">
          <div className="flex space-x-2">
            {daysOfWeek.map((day, index) => (
              <button
                key={day}
                onClick={() => {
                  setCurrentDay(index);
                  setNotes(mealPlan[index]?.notes || "");
                }}
                className={`px-4 py-2 text-sm rounded-full whitespace-nowrap ${
                  currentDay === index
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Meal Plan Section */}
        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <CalendarDaysIcon className="h-5 w-5 mr-2 text-green-600" />
                {daysOfWeek[currentDay]}
              </h2>
            </div>

            {/* Breakfast */}
            <div className="p-5 border-b border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Petit-déjeuner
                </h3>
                <button
                  onClick={() => openMealSelector("breakfast")}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center"
                >
                  <PlusCircleIcon className="h-5 w-5 mr-1" />
                  {mealPlan[currentDay]?.meals.breakfast
                    ? "Changer"
                    : "Ajouter"}
                </button>
              </div>

              {mealPlan[currentDay]?.meals.breakfast ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        {mealPlan[currentDay].meals.breakfast.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {mealPlan[
                          currentDay
                        ].meals.breakfast.description.substring(0, 100)}
                        ...
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {
                            mealPlan[currentDay].meals.breakfast.nutritionFacts
                              .calories
                          }{" "}
                          calories
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {
                            mealPlan[currentDay].meals.breakfast.nutritionFacts
                              .protein
                          }
                          g protéines
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMeal("breakfast")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">
                    Aucun petit-déjeuner sélectionné
                  </p>
                </div>
              )}
            </div>

            {/* Lunch */}
            <div className="p-5 border-b border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-900">Déjeuner</h3>
                <button
                  onClick={() => openMealSelector("lunch")}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center"
                >
                  <PlusCircleIcon className="h-5 w-5 mr-1" />
                  {mealPlan[currentDay]?.meals.lunch ? "Changer" : "Ajouter"}
                </button>
              </div>

              {mealPlan[currentDay]?.meals.lunch ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        {mealPlan[currentDay].meals.lunch.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {mealPlan[currentDay].meals.lunch.description.substring(
                          0,
                          100
                        )}
                        ...
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {
                            mealPlan[currentDay].meals.lunch.nutritionFacts
                              .calories
                          }{" "}
                          calories
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {
                            mealPlan[currentDay].meals.lunch.nutritionFacts
                              .protein
                          }
                          g protéines
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMeal("lunch")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Aucun déjeuner sélectionné</p>
                </div>
              )}
            </div>

            {/* Dinner */}
            <div className="p-5 border-b border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-900">Dîner</h3>
                <button
                  onClick={() => openMealSelector("dinner")}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center"
                >
                  <PlusCircleIcon className="h-5 w-5 mr-1" />
                  {mealPlan[currentDay]?.meals.dinner ? "Changer" : "Ajouter"}
                </button>
              </div>

              {mealPlan[currentDay]?.meals.dinner ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        {mealPlan[currentDay].meals.dinner.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {mealPlan[
                          currentDay
                        ].meals.dinner.description.substring(0, 100)}
                        ...
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {
                            mealPlan[currentDay].meals.dinner.nutritionFacts
                              .calories
                          }{" "}
                          calories
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {
                            mealPlan[currentDay].meals.dinner.nutritionFacts
                              .protein
                          }
                          g protéines
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMeal("dinner")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Aucun dîner sélectionné</p>
                </div>
              )}
            </div>

            {/* Snacks */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Collations
                </h3>
                <button
                  onClick={() => openMealSelector("snacks")}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center"
                >
                  <PlusCircleIcon className="h-5 w-5 mr-1" />
                  Ajouter
                </button>
              </div>

              {mealPlan[currentDay]?.meals.snacks.length > 0 ? (
                <div className="space-y-3">
                  {mealPlan[currentDay].meals.snacks.map((snack, index) => (
                    <div
                      key={`${snack.id}-${index}`}
                      className="bg-gray-50 p-4 rounded-md"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{snack.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {snack.description.substring(0, 60)}...
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {snack.nutritionFacts.calories} calories
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveMeal("snacks", index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Aucune collation sélectionnée</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Notes</h2>
            </div>
            <div className="p-5">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                rows={3}
                placeholder="Ajoutez des notes pour cette journée..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleSaveNotes}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Summary Section */}
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg overflow-hidden sticky top-20">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Résumé nutritionnel
              </h2>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Calories
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {dailyNutrition.calories}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (dailyNutrition.calories / 2500) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Protéines
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {dailyNutrition.protein}g
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (dailyNutrition.protein / 80) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Glucides
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {dailyNutrition.carbs}g
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (dailyNutrition.carbs / 300) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Lipides
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {dailyNutrition.fat}g
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (dailyNutrition.fat / 65) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Fibres
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {dailyNutrition.fiber}g
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (dailyNutrition.fiber / 30) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-4">
                <button
                  onClick={printMealPlan}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Imprimer le plan de repas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Selector Modal */}
      {showRecipeSelector && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Sélectionner une recette pour{" "}
                    {activeMealType === "breakfast"
                      ? "le petit-déjeuner"
                      : activeMealType === "lunch"
                      ? "le déjeuner"
                      : activeMealType === "dinner"
                      ? "le dîner"
                      : "les collations"}
                  </h3>
                  <button
                    onClick={() => setShowRecipeSelector(false)}
                    className="rounded-md text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Search box */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher des recettes..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Recipe list */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredRecipes.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {filteredRecipes.map((recipe) => (
                        <li
                          key={recipe.id}
                          className="px-4 py-4 hover:bg-gray-50"
                        >
                          <button
                            className="w-full text-left"
                            onClick={() => handleMealSelection(recipe)}
                          >
                            <div className="flex items-start">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-base font-medium text-gray-900 truncate">
                                  {recipe.title}
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                  {recipe.description.substring(0, 100)}...
                                </p>
                                <div className="flex mt-2 items-center">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                                    {recipe.nutritionFacts.calories} cal
                                  </span>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                                    {recipe.nutritionFacts.protein}g prot
                                  </span>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    {recipe.nutritionFacts.carbs}g carb
                                  </span>
                                </div>
                              </div>
                              <button
                                className="ml-4 flex-shrink-0 bg-green-100 p-1 rounded-full hover:bg-green-200"
                                onClick={() => handleMealSelection(recipe)}
                              >
                                <PlusIcon className="h-5 w-5 text-green-600" />
                              </button>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Aucune recette trouvée</p>
                    </div>
                  )}
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={() => setShowRecipeSelector(false)}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// We'll use global CSS for print styles instead
