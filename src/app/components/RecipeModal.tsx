"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ClockIcon,
  FireIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { Recipe, DigestiveSymptom } from "../types";

interface RecipeModalProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
}

export default function RecipeModal({
  recipe,
  open,
  onClose,
}: RecipeModalProps) {
  if (!recipe) return null;

  const getSymptomName = (symptom: DigestiveSymptom): string => {
    switch (symptom) {
      case "diarrhea":
        return "Diarrhée";
      case "abdominal_pain":
        return "Douleurs abdominales";
      case "dry_mouth":
        return "Sécheresse buccale";
      case "nausea_vomiting":
        return "Nausées et vomissements";
      case "constipation":
        return "Constipation";
      default:
        return symptom;
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-3xl">
                <div className="absolute right-0 top-0 pr-4 pt-4 block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Fermer</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>{" "}
                {/* Recipe header with image */}
                <div className="relative px-6 py-16 sm:px-16 sm:py-24 lg:px-8">
                  {recipe.imageUrl ? (
                    <>
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-500"></div>
                      <div className="absolute inset-0 bg-white/10 pattern-dots"></div>
                    </>
                  )}
                  <div className="relative z-10 mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                      {recipe.title}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-white/80 italic">
                      {recipe.description}
                    </p>
                  </div>
                </div>
                {/* Recipe content */}
                <div className="bg-white px-4 pt-5 pb-6 sm:p-6 sm:pb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left column - Nutrition facts */}
                    <div className="bg-green-50 p-5 rounded-lg">
                      <h3 className="text-lg font-medium text-green-800 mb-4">
                        Valeurs nutritionnelles
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-green-200 pb-2">
                          <div className="flex items-center">
                            <FireIcon className="h-5 w-5 text-green-600 mr-2" />
                            <span className="text-sm font-medium text-green-700">
                              Calories
                            </span>
                          </div>
                          <span className="font-semibold text-green-900">
                            {recipe.nutritionFacts.calories} kcal
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-green-200 pb-2">
                          <span className="text-sm text-green-700">
                            Protéines
                          </span>
                          <span className="font-medium text-green-800">
                            {recipe.nutritionFacts.protein}g
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-green-200 pb-2">
                          <span className="text-sm text-green-700">
                            Glucides
                          </span>
                          <span className="font-medium text-green-800">
                            {recipe.nutritionFacts.carbs}g
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-green-200 pb-2">
                          <span className="text-sm text-green-700">
                            Lipides
                          </span>
                          <span className="font-medium text-green-800">
                            {recipe.nutritionFacts.fat}g
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-700">Fibres</span>
                          <span className="font-medium text-green-800">
                            {recipe.nutritionFacts.fiber}g
                          </span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-green-700 mb-2">
                          Adapté pour
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {recipe.suitableFor.symptoms.map((symptom) => (
                            <span
                              key={symptom}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300"
                            >
                              {getSymptomName(symptom)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right column - Ingredients and Instructions */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Ingrédients
                        </h3>
                        <ul className="space-y-2 ml-5">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-gray-700 list-disc">
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Instructions
                        </h3>
                        <ol className="space-y-3 ml-5">
                          {recipe.instructions.map((instruction, index) => (
                            <li key={index} className="text-gray-700">
                              <div className="flex">
                                <span className="font-medium text-green-700 mr-2">
                                  {index + 1}.
                                </span>
                                <span>{instruction}</span>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                  >
                    Fermer
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
