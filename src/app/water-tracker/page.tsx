"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  PlusIcon,
  MinusIcon,
  ArrowPathIcon,
  BeakerIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function WaterTrackerPage() {
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [goal, setGoal] = useState<number>(8); // Default goal: 8 glasses (2L)
  const [isSettingGoal, setIsSettingGoal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedWaterIntake = localStorage.getItem("waterIntake");
      const savedWaterGoal = localStorage.getItem("waterGoal");
      const savedDate = localStorage.getItem("waterDate");
      const today = new Date().toLocaleDateString();

      // Reset counter if it's a new day
      if (savedDate !== today) {
        localStorage.setItem("waterDate", today);
        localStorage.setItem("waterIntake", "0");
        setWaterIntake(0);
      } else if (savedWaterIntake) {
        setWaterIntake(parseInt(savedWaterIntake));
      }

      if (savedWaterGoal) {
        setGoal(parseInt(savedWaterGoal));
      }
    } catch (error) {
      console.error("Error loading water intake data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save data to localStorage whenever values change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("waterIntake", waterIntake.toString());
      localStorage.setItem("waterGoal", goal.toString());
      localStorage.setItem("waterDate", new Date().toLocaleDateString());
    }
  }, [waterIntake, goal, isLoading]);

  const addWater = () => {
    const newValue = waterIntake + 1;
    setWaterIntake(newValue);

    if (newValue === goal) {
      toast.success(
        "Bravo ! Vous avez atteint votre objectif d'hydratation quotidien !"
      );
    } else if (newValue > goal) {
      toast.info(
        "Excellent ! Vous avez dépassé votre objectif d'hydratation !"
      );
    }
  };

  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake(waterIntake - 1);
    }
  };

  const resetWater = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir remettre à zéro votre compteur d'eau ?"
      )
    ) {
      setWaterIntake(0);
      toast.info("Compteur d'eau réinitialisé");
    }
  };

  const saveGoal = (newGoal: number) => {
    if (newGoal >= 1 && newGoal <= 20) {
      setGoal(newGoal);
      setIsSettingGoal(false);
      toast.success(`Objectif défini à ${newGoal} verres`);
    } else {
      toast.error("Veuillez entrer une valeur entre 1 et 20", {
        toastId: "water-goal-validation",
      });
    }
  };

  const getProgressColor = () => {
    const percentage = (waterIntake / goal) * 100;
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-orange-500";
    if (percentage < 100) return "bg-teal-500";
    return "bg-green-500";
  };

  const progressPercentage = Math.min((waterIntake / goal) * 100, 100);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Suivi d'hydratation
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Gardez une trace de votre consommation d'eau quotidienne.
      </p>

      {/* Goal Setting */}
      <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Objectif quotidien
          </h2>
          {!isSettingGoal ? (
            <button
              onClick={() => setIsSettingGoal(true)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Modifier
            </button>
          ) : null}
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            {isSettingGoal ? (
              <div className="flex flex-col space-y-4">
                <label
                  htmlFor="waterGoal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de verres (1 verre = 250ml)
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="waterGoal"
                    name="waterGoal"
                    min="1"
                    max="20"
                    value={goal}
                    onChange={(e) =>
                      setGoal(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <span className="ml-2 text-gray-500 whitespace-nowrap">
                    verres
                  </span>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsSettingGoal(false)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => saveGoal(goal)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            ) : (
              <div className="sm:flex sm:items-start sm:justify-between">
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Votre objectif est de boire {goal} verres d'eau par jour
                    (environ {goal * 250}ml).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Water Tracker Card */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <BeakerIcon className="h-5 w-5 mr-2 text-blue-500" />
            Suivi quotidien
          </h2>
        </div>

        {/* Water Visual Representation */}
        <div className="px-4 pt-5 sm:p-6 flex flex-col items-center">
          <div className="relative w-48 h-64 mb-6 bg-blue-50 rounded-lg border-2 border-blue-200">
            {/* Water Level */}
            <div
              className={`absolute bottom-0 w-full ${getProgressColor()} transition-all duration-500 ease-out rounded-b-lg`}
              style={{ height: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 opacity-30">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path d="M0,0 v100 h100 v-100 z" fill="url(#water)" />
                  <defs>
                    <linearGradient
                      id="water"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.5">
                        <animate
                          attributeName="offset"
                          values="0;0.5;0"
                          dur="5s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="50%" stopColor="#fff" stopOpacity="0.2">
                        <animate
                          attributeName="offset"
                          values="0.5;1;0.5"
                          dur="5s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="100%" stopColor="#fff" stopOpacity="0.5">
                        <animate
                          attributeName="offset"
                          values="1;0.5;1"
                          dur="5s"
                          repeatCount="indefinite"
                        />
                      </stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Glass markings */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`border-t border-dashed ${
                    i === 0 ? "border-transparent" : "border-blue-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {waterIntake} / {goal}
            </div>
            <div className="text-sm text-gray-500">verres consommés</div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center space-x-6 mb-6">
            <button
              onClick={removeWater}
              disabled={waterIntake <= 0}
              className={`p-3 rounded-full ${
                waterIntake <= 0
                  ? "bg-gray-200 text-gray-400"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              }`}
            >
              <MinusIcon className="h-6 w-6" />
            </button>
            <button
              onClick={addWater}
              className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              <PlusIcon className="h-6 w-6" />
            </button>
            <button
              onClick={resetWater}
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              <ArrowPathIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Information Box */}
        <div className="bg-blue-50 px-4 py-4 sm:px-6 border-t border-blue-100">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                L'hydratation est particulièrement importante durant votre
                traitement. Une consommation adéquate d'eau aide à atténuer
                certains effets secondaires.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hydration Tips */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Conseils d'hydratation
        </h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex">
            <div className="flex-shrink-0 h-5 w-5 text-blue-500">•</div>
            <p className="ml-2">
              Buvez de petites quantités tout au long de la journée plutôt que
              de grandes quantités en une fois.
            </p>
          </li>
          <li className="flex">
            <div className="flex-shrink-0 h-5 w-5 text-blue-500">•</div>
            <p className="ml-2">
              Pour les nausées, essayez de boire entre les repas plutôt que
              pendant les repas.
            </p>
          </li>
          <li className="flex">
            <div className="flex-shrink-0 h-5 w-5 text-blue-500">•</div>
            <p className="ml-2">
              Si vous avez des problèmes de goût, ajoutez un peu de citron, de
              concombre ou de menthe à votre eau.
            </p>
          </li>
          <li className="flex">
            <div className="flex-shrink-0 h-5 w-5 text-blue-500">•</div>
            <p className="ml-2">
              Les boissons isotoniques peuvent être utiles si vous souffrez de
              diarrhée pour restaurer les électrolytes.
            </p>
          </li>
          <li className="flex">
            <div className="flex-shrink-0 h-5 w-5 text-blue-500">•</div>
            <p className="ml-2">
              Le thé et les infusions légères comptent dans votre apport en eau
              quotidien.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
