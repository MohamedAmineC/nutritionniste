"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import { DigestiveCancerType, DigestiveSymptom, Recipe } from "../types";
import { recipes } from "../data";
import RecipeModal from "../components/RecipeModal";

export default function RecipesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [selectedSymptoms, setSelectedSymptoms] = useState<DigestiveSymptom[]>(
    []
  );
  const [selectedCancerTypes, setSelectedCancerTypes] = useState<
    DigestiveCancerType[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter recipes based on search term, symptoms, and cancer types
    const filtered = recipes.filter((recipe) => {
      const matchesSearchTerm =
        searchTerm === "" ||
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSymptoms =
        selectedSymptoms.length === 0 ||
        selectedSymptoms.some((symptom) =>
          recipe.suitableFor.symptoms.includes(symptom)
        );

      const matchesCancerTypes =
        selectedCancerTypes.length === 0 ||
        selectedCancerTypes.some((cancerType) =>
          recipe.suitableFor.cancerTypes.includes(cancerType)
        );

      return matchesSearchTerm && matchesSymptoms && matchesCancerTypes;
    });

    setFilteredRecipes(filtered);
  }, [searchTerm, selectedSymptoms, selectedCancerTypes]);

  const toggleSymptom = (symptom: DigestiveSymptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const toggleCancerType = (cancerType: DigestiveCancerType) => {
    if (selectedCancerTypes.includes(cancerType)) {
      setSelectedCancerTypes(
        selectedCancerTypes.filter((c) => c !== cancerType)
      );
    } else {
      setSelectedCancerTypes([...selectedCancerTypes, cancerType]);
    }
  };

  const clearFilters = () => {
    setSelectedSymptoms([]);
    setSelectedCancerTypes([]);
    setSearchTerm("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Recettes adaptées
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Des recettes conçues pour les patients atteints de cancer digestif.
      </p>

      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une recette..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <AdjustmentsHorizontalIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            Filtres
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Symptômes
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => toggleSymptom("diarrhea")}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium mr-2 ${
                      selectedSymptoms.includes("diarrhea")
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Diarrhées
                  </button>
                  <button
                    onClick={() => toggleSymptom("abdominal_pain")}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium mr-2 ${
                      selectedSymptoms.includes("abdominal_pain")
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Douleurs abdominales
                  </button>
                  <button
                    onClick={() => toggleSymptom("dry_mouth")}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium mr-2 ${
                      selectedSymptoms.includes("dry_mouth")
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Sécheresse buccale
                  </button>
                  <button
                    onClick={() => toggleSymptom("nausea_vomiting")}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium mr-2 ${
                      selectedSymptoms.includes("nausea_vomiting")
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Nausées et vomissements
                  </button>
                  <button
                    onClick={() => toggleSymptom("constipation")}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium mr-2 ${
                      selectedSymptoms.includes("constipation")
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Constipation
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Types de cancer
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => toggleCancerType("colorectal")}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium mr-2 ${
                      selectedCancerTypes.includes("colorectal")
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Colorectal
                  </button>
                  <button
                    onClick={() => toggleCancerType("pancreas")}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium mr-2 ${
                      selectedCancerTypes.includes("pancreas")
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Pancréas
                  </button>
                  <button
                    onClick={() => toggleCancerType("gastric")}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium mr-2 ${
                      selectedCancerTypes.includes("gastric")
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Gastrique
                  </button>
                  <button
                    onClick={() => toggleCancerType("rectum")}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium mr-2 ${
                      selectedCancerTypes.includes("rectum")
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Rectum
                  </button>
                  <button
                    onClick={() => toggleCancerType("stomach")}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium mr-2 ${
                      selectedCancerTypes.includes("stomach")
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Estomac
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Effacer les filtres
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recipes Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {" "}
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => {
                setSelectedRecipe(recipe);
                setShowModal(true);
              }}
              role="button"
              aria-label={`Voir les détails de la recette ${recipe.title}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedRecipe(recipe);
                  setShowModal(true);
                }
              }}
            >
              <div className="h-48 relative overflow-hidden">
                {recipe.imageUrl ? (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="h-full bg-gradient-to-r from-green-100 to-teal-50 flex items-center justify-center relative">
                    <div className="absolute inset-0 opacity-20 bg-pattern-food"></div>
                    <div className="relative z-10 text-center">
                      <div className="bg-white rounded-full p-3 mx-auto mb-2 shadow-md">
                        <BeakerIcon
                          className="h-8 w-8 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-sm font-medium text-green-800">
                        Recette adaptée
                      </p>
                    </div>
                  </div>
                )}
                <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-bl-md">
                  Recette adaptée
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.suitableFor.symptoms.map((symptom) => (
                    <span
                      key={symptom}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                    >
                      {symptom === "diarrhea" && "Diarrhée"}
                      {symptom === "abdominal_pain" && "Douleurs abdominales"}
                      {symptom === "dry_mouth" && "Sécheresse buccale"}
                      {symptom === "nausea_vomiting" && "Nausées"}
                      {symptom === "constipation" && "Constipation"}
                    </span>
                  ))}
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="flex items-center text-amber-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {recipe.nutritionFacts.calories} kcal
                    </span>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md">
                        P: {recipe.nutritionFacts.protein}g
                      </span>
                      <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded-md">
                        G: {recipe.nutritionFacts.carbs}g
                      </span>
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-md">
                        L: {recipe.nutritionFacts.fat}g
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Aucune recette trouvée
          </h2>
          <p className="text-gray-500">
            Essayez de modifier vos filtres de recherche.
          </p>{" "}
        </div>
      )}

      {/* Recipe Detail Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
