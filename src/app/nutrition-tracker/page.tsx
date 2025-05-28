"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  PlusIcon,
  MinusIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

type NutrientType = "calories" | "protein" | "carbs" | "fat" | "fiber";

interface FoodEntry {
  id: string;
  name: string;
  amount: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  date: string;
}

interface DailyNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export default function NutritionTrackerPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [showFoodModal, setShowFoodModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMealType, setSelectedMealType] = useState<
    "breakfast" | "lunch" | "dinner" | "snack"
  >("breakfast");

  // Form data
  const [foodName, setFoodName] = useState<string>("");
  const [foodAmount, setFoodAmount] = useState<string>("");
  const [foodCalories, setFoodCalories] = useState<number>(0);
  const [foodProtein, setFoodProtein] = useState<number>(0);
  const [foodCarbs, setFoodCarbs] = useState<number>(0);
  const [foodFat, setFoodFat] = useState<number>(0);
  const [foodFiber, setFoodFiber] = useState<number>(0);

  // Editing mode
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingFoodId, setEditingFoodId] = useState<string | null>(null);

  // Nutrition goals
  const [goals, setGoals] = useState<DailyGoals>({
    calories: 2000,
    protein: 75,
    carbs: 250,
    fat: 65,
    fiber: 25,
  });
  const [showGoalsModal, setShowGoalsModal] = useState<boolean>(false);
  const [tempGoals, setTempGoals] = useState<DailyGoals>({
    calories: 2000,
    protein: 75,
    carbs: 250,
    fat: 65,
    fiber: 25,
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);

    try {
      // Load food entries
      const storedFoodEntries = localStorage.getItem("foodEntries");
      if (storedFoodEntries) {
        setFoodEntries(JSON.parse(storedFoodEntries));
      }

      // Load nutrition goals
      const storedGoals = localStorage.getItem("nutritionGoals");
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
        setTempGoals(JSON.parse(storedGoals));
      } else {
        // Try to get calorie data from assessment
        const storedCalorieData = localStorage.getItem("calorieData");
        if (storedCalorieData) {
          const { recommendedCalories } = JSON.parse(storedCalorieData);
          if (recommendedCalories) {
            const newGoals = {
              calories: recommendedCalories,
              protein: Math.round((recommendedCalories * 0.15) / 4), // 15% of calories from protein, 4 cal per gram
              carbs: Math.round((recommendedCalories * 0.5) / 4), // 50% of calories from carbs, 4 cal per gram
              fat: Math.round((recommendedCalories * 0.35) / 9), // 35% of calories from fat, 9 cal per gram
              fiber: 25,
            };
            setGoals(newGoals);
            setTempGoals(newGoals);
            localStorage.setItem("nutritionGoals", JSON.stringify(newGoals));
          }
        }
      }
    } catch (error) {
      console.error("Error loading nutrition data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save food entries whenever they change
  useEffect(() => {
    if (!isLoading && foodEntries.length > 0) {
      localStorage.setItem("foodEntries", JSON.stringify(foodEntries));
    }
  }, [foodEntries, isLoading]);

  const calculateDailyNutrition = (): DailyNutrition => {
    const todayEntries = foodEntries.filter(
      (entry) => entry.date === selectedDate
    );

    return todayEntries.reduce(
      (acc, entry) => {
        acc.calories += entry.calories;
        acc.protein += entry.protein;
        acc.carbs += entry.carbs;
        acc.fat += entry.fat;
        acc.fiber += entry.fiber;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const openAddFoodModal = (
    mealType: "breakfast" | "lunch" | "dinner" | "snack"
  ) => {
    setSelectedMealType(mealType);
    resetFoodForm();
    setEditMode(false);
    setShowFoodModal(true);
  };

  const closeAddFoodModal = () => {
    setShowFoodModal(false);
  };

  const resetFoodForm = () => {
    setFoodName("");
    setFoodAmount("");
    setFoodCalories(0);
    setFoodProtein(0);
    setFoodCarbs(0);
    setFoodFat(0);
    setFoodFiber(0);
    setEditMode(false);
    setEditingFoodId(null);
  };

  const handleAddFood = () => {
    if (!foodName.trim() || !foodAmount.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires", {
        toastId: "food-fields-required",
      });
      return;
    }

    if (foodCalories <= 0) {
      toast.error("Les calories doivent être supérieures à 0", {
        toastId: "calories-validation",
      });
      return;
    }

    if (editMode && editingFoodId) {
      // Update existing food entry
      setFoodEntries((prev) =>
        prev.map((entry) =>
          entry.id === editingFoodId
            ? {
                ...entry,
                name: foodName,
                amount: foodAmount,
                calories: foodCalories,
                protein: foodProtein,
                carbs: foodCarbs,
                fat: foodFat,
                fiber: foodFiber,
              }
            : entry
        )
      );

      toast.success("Aliment mis à jour avec succès");
    } else {
      // Add new food entry
      const newEntry: FoodEntry = {
        id: `food-${Date.now()}`,
        name: foodName,
        amount: foodAmount,
        calories: foodCalories,
        protein: foodProtein,
        carbs: foodCarbs,
        fat: foodFat,
        fiber: foodFiber,
        mealType: selectedMealType,
        date: selectedDate,
      };

      setFoodEntries((prev) => [...prev, newEntry]);
      toast.success("Aliment ajouté avec succès");
    }

    closeAddFoodModal();
  };

  const handleEditFood = (food: FoodEntry) => {
    setFoodName(food.name);
    setFoodAmount(food.amount);
    setFoodCalories(food.calories);
    setFoodProtein(food.protein);
    setFoodCarbs(food.carbs);
    setFoodFat(food.fat);
    setFoodFiber(food.fiber);
    setSelectedMealType(food.mealType);
    setEditMode(true);
    setEditingFoodId(food.id);
    setShowFoodModal(true);
  };

  const handleDeleteFood = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet aliment ?")) {
      setFoodEntries((prev) => prev.filter((entry) => entry.id !== id));
      toast.success("Aliment supprimé avec succès");
    }
  };

  const handleSaveGoals = () => {
    setGoals({ ...tempGoals });
    localStorage.setItem("nutritionGoals", JSON.stringify(tempGoals));
    setShowGoalsModal(false);
    toast.success("Objectifs nutritionnels mis à jour");
  };

  const getMealEntries = (
    mealType: "breakfast" | "lunch" | "dinner" | "snack"
  ) => {
    return foodEntries.filter(
      (entry) => entry.date === selectedDate && entry.mealType === mealType
    );
  };

  const getNutrientProgress = (nutrient: NutrientType): number => {
    const dailyTotal = calculateDailyNutrition();
    return Math.min((dailyTotal[nutrient] / goals[nutrient]) * 100, 100);
  };

  const getMealTypeLabel = (mealType: string): string => {
    switch (mealType) {
      case "breakfast":
        return "Petit-déjeuner";
      case "lunch":
        return "Déjeuner";
      case "dinner":
        return "Dîner";
      case "snack":
        return "Collation";
      default:
        return mealType;
    }
  };

  const dailyTotals = calculateDailyNutrition();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Suivi nutritionnel
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Suivez votre apport nutritionnel quotidien
      </p>

      {/* Date selector and goals button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center">
          <CalendarDaysIcon className="h-5 w-5 text-gray-500 mr-2" />
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="shadow-sm focus:ring-green-500 focus:border-green-500 block sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={() => setShowGoalsModal(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ChartBarIcon className="h-5 w-5 mr-2 text-gray-500" />
          Objectifs nutritionnels
        </button>
      </div>

      {/* Nutrition progress summary */}
      <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Progression journalière
          </h2>

          <div className="space-y-4">
            {/* Calories */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Calories
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {dailyTotals.calories} / {goals.calories} kcal
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${getNutrientProgress("calories")}%` }}
                ></div>
              </div>
            </div>

            {/* Protein */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Protéines
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {dailyTotals.protein} / {goals.protein} g
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${getNutrientProgress("protein")}%` }}
                ></div>
              </div>
            </div>

            {/* Carbs */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Glucides
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {dailyTotals.carbs} / {goals.carbs} g
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-600 h-2.5 rounded-full"
                  style={{ width: `${getNutrientProgress("carbs")}%` }}
                ></div>
              </div>
            </div>

            {/* Fat */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Lipides
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {dailyTotals.fat} / {goals.fat} g
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: `${getNutrientProgress("fat")}%` }}
                ></div>
              </div>
            </div>

            {/* Fiber */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Fibres
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {dailyTotals.fiber} / {goals.fiber} g
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: `${getNutrientProgress("fiber")}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meals section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Breakfast */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Petit-déjeuner
            </h3>
            <button
              onClick={() => openAddFoodModal("breakfast")}
              className="inline-flex items-center p-1.5 border border-transparent rounded-full text-white bg-green-600 hover:bg-green-700"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="border-t border-gray-200">
            {getMealEntries("breakfast").length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {getMealEntries("breakfast").map((entry) => (
                  <li key={entry.id} className="px-4 py-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {entry.name}
                        </p>
                        <p className="text-sm text-gray-500">{entry.amount}</p>
                      </div>
                      <div className="flex items-start">
                        <p className="text-sm font-medium text-gray-900">
                          {entry.calories} kcal
                        </p>
                        <div className="ml-4 flex">
                          <button
                            onClick={() => handleEditFood(entry)}
                            className="mr-2 text-gray-400 hover:text-gray-500"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteFood(entry.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 px-4">
                <p className="text-gray-500 text-sm">
                  Aucun aliment enregistré pour le petit-déjeuner
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Lunch */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Déjeuner</h3>
            <button
              onClick={() => openAddFoodModal("lunch")}
              className="inline-flex items-center p-1.5 border border-transparent rounded-full text-white bg-green-600 hover:bg-green-700"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="border-t border-gray-200">
            {getMealEntries("lunch").length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {getMealEntries("lunch").map((entry) => (
                  <li key={entry.id} className="px-4 py-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {entry.name}
                        </p>
                        <p className="text-sm text-gray-500">{entry.amount}</p>
                      </div>
                      <div className="flex items-start">
                        <p className="text-sm font-medium text-gray-900">
                          {entry.calories} kcal
                        </p>
                        <div className="ml-4 flex">
                          <button
                            onClick={() => handleEditFood(entry)}
                            className="mr-2 text-gray-400 hover:text-gray-500"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteFood(entry.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 px-4">
                <p className="text-gray-500 text-sm">
                  Aucun aliment enregistré pour le déjeuner
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Dinner */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Dîner</h3>
            <button
              onClick={() => openAddFoodModal("dinner")}
              className="inline-flex items-center p-1.5 border border-transparent rounded-full text-white bg-green-600 hover:bg-green-700"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="border-t border-gray-200">
            {getMealEntries("dinner").length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {getMealEntries("dinner").map((entry) => (
                  <li key={entry.id} className="px-4 py-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {entry.name}
                        </p>
                        <p className="text-sm text-gray-500">{entry.amount}</p>
                      </div>
                      <div className="flex items-start">
                        <p className="text-sm font-medium text-gray-900">
                          {entry.calories} kcal
                        </p>
                        <div className="ml-4 flex">
                          <button
                            onClick={() => handleEditFood(entry)}
                            className="mr-2 text-gray-400 hover:text-gray-500"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteFood(entry.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 px-4">
                <p className="text-gray-500 text-sm">
                  Aucun aliment enregistré pour le dîner
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Snacks */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Collations</h3>
            <button
              onClick={() => openAddFoodModal("snack")}
              className="inline-flex items-center p-1.5 border border-transparent rounded-full text-white bg-green-600 hover:bg-green-700"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="border-t border-gray-200">
            {getMealEntries("snack").length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {getMealEntries("snack").map((entry) => (
                  <li key={entry.id} className="px-4 py-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {entry.name}
                        </p>
                        <p className="text-sm text-gray-500">{entry.amount}</p>
                      </div>
                      <div className="flex items-start">
                        <p className="text-sm font-medium text-gray-900">
                          {entry.calories} kcal
                        </p>
                        <div className="ml-4 flex">
                          <button
                            onClick={() => handleEditFood(entry)}
                            className="mr-2 text-gray-400 hover:text-gray-500"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteFood(entry.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 px-4">
                <p className="text-gray-500 text-sm">
                  Aucun aliment enregistré pour les collations
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Food Modal */}
      {showFoodModal && (
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

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {editMode
                      ? "Modifier l'aliment"
                      : `Ajouter un aliment (${getMealTypeLabel(
                          selectedMealType
                        )})`}
                  </h3>
                  <button
                    onClick={closeAddFoodModal}
                    className="rounded-md text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="foodName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom de l'aliment *
                      </label>
                      <input
                        id="foodName"
                        type="text"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                        placeholder="Ex: Poulet grillé"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="foodAmount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Quantité *
                      </label>
                      <input
                        id="foodAmount"
                        type="text"
                        value={foodAmount}
                        onChange={(e) => setFoodAmount(e.target.value)}
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                        placeholder="Ex: 100g ou 1 portion"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="foodCalories"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Calories (kcal) *
                      </label>
                      <input
                        id="foodCalories"
                        type="number"
                        min="0"
                        value={foodCalories}
                        onChange={(e) =>
                          setFoodCalories(Number(e.target.value))
                        }
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    {/* Nutrient grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="foodProtein"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Protéines (g)
                        </label>
                        <input
                          id="foodProtein"
                          type="number"
                          min="0"
                          step="0.1"
                          value={foodProtein}
                          onChange={(e) =>
                            setFoodProtein(Number(e.target.value))
                          }
                          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="foodCarbs"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Glucides (g)
                        </label>
                        <input
                          id="foodCarbs"
                          type="number"
                          min="0"
                          step="0.1"
                          value={foodCarbs}
                          onChange={(e) => setFoodCarbs(Number(e.target.value))}
                          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="foodFat"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Lipides (g)
                        </label>
                        <input
                          id="foodFat"
                          type="number"
                          min="0"
                          step="0.1"
                          value={foodFat}
                          onChange={(e) => setFoodFat(Number(e.target.value))}
                          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="foodFiber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Fibres (g)
                        </label>
                        <input
                          id="foodFiber"
                          type="number"
                          min="0"
                          step="0.1"
                          value={foodFiber}
                          onChange={(e) => setFoodFiber(Number(e.target.value))}
                          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse bg-gray-50">
                  <button
                    type="button"
                    onClick={handleAddFood}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editMode ? "Mettre à jour" : "Ajouter"}
                  </button>
                  <button
                    type="button"
                    onClick={closeAddFoodModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Goals Modal */}
      {showGoalsModal && (
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

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Objectifs nutritionnels quotidiens
                  </h3>
                  <button
                    onClick={() => setShowGoalsModal(false)}
                    className="rounded-md text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="goalCalories"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Calories (kcal)
                      </label>
                      <input
                        id="goalCalories"
                        type="number"
                        min="500"
                        max="5000"
                        value={tempGoals.calories}
                        onChange={(e) =>
                          setTempGoals({
                            ...tempGoals,
                            calories: Number(e.target.value),
                          })
                        }
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="goalProtein"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Protéines (g)
                      </label>
                      <input
                        id="goalProtein"
                        type="number"
                        min="0"
                        value={tempGoals.protein}
                        onChange={(e) =>
                          setTempGoals({
                            ...tempGoals,
                            protein: Number(e.target.value),
                          })
                        }
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="goalCarbs"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Glucides (g)
                      </label>
                      <input
                        id="goalCarbs"
                        type="number"
                        min="0"
                        value={tempGoals.carbs}
                        onChange={(e) =>
                          setTempGoals({
                            ...tempGoals,
                            carbs: Number(e.target.value),
                          })
                        }
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="goalFat"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lipides (g)
                      </label>
                      <input
                        id="goalFat"
                        type="number"
                        min="0"
                        value={tempGoals.fat}
                        onChange={(e) =>
                          setTempGoals({
                            ...tempGoals,
                            fat: Number(e.target.value),
                          })
                        }
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="goalFiber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Fibres (g)
                      </label>
                      <input
                        id="goalFiber"
                        type="number"
                        min="0"
                        value={tempGoals.fiber}
                        onChange={(e) =>
                          setTempGoals({
                            ...tempGoals,
                            fiber: Number(e.target.value),
                          })
                        }
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse bg-gray-50">
                  <button
                    type="button"
                    onClick={handleSaveGoals}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGoalsModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
