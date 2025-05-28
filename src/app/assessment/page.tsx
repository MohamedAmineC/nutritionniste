"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import {
  PatientData,
  Gender,
  DigestiveCancerType,
  PhysicalActivity,
  DigestiveSymptom,
} from "../types";
import {
  calculateBMI,
  getBMICategory,
  getRecommendedCalories,
} from "../utils/calculations";

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PatientData>({
    defaultValues: {
      digestiveSymptoms: [],
      hasAnorexia: false,
    },
  });

  const watchAll = watch();

  const onSubmit = async (data: PatientData) => {
    setLoading(true);

    try {
      // In a real app, you might send this data to a backend API
      // For now, we'll just simulate a delay and store in localStorage
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("patientData", JSON.stringify(data));

      // Calculate BMI
      const bmi = calculateBMI(data.weight, data.height);
      const bmiCategory = getBMICategory(bmi);
      localStorage.setItem(
        "bmiData",
        JSON.stringify({ bmi, category: bmiCategory })
      );

      // Calculate recommended calories
      const calories = getRecommendedCalories(
        data.gender,
        data.weight,
        data.height,
        data.physicalActivity,
        data.hasAnorexia
      );
      localStorage.setItem(
        "calorieData",
        JSON.stringify({ recommendedCalories: calories })
      );

      toast.success("Évaluation terminée avec succès !");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.", {
        toastId: "assessment-submission-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Évaluation nutritionnelle
            </span>
          </h1>
          <p className="text-gray-600 mb-8">
            Complétez ce formulaire pour recevoir des recommandations
            personnalisées
          </p>
          {/* Progress indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progression
              </span>
              <span className="text-sm font-semibold bg-green-50 text-green-700 px-2 py-1 rounded">
                {Math.floor((step / 3) * 100)}%
              </span>
            </div>
            <div
              className="w-full bg-gray-100 rounded-full h-3 shadow-inner"
              role="progressbar"
              aria-valuenow={Math.floor((step / 3) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Étape ${step} sur 3`}
            >
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${Math.floor((step / 3) * 100)}%` }}
              ></div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center border-b border-gray-200 pb-3 mb-1">
                  <svg
                    className="w-5 h-5 mr-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Informations personnelles
                </h2>{" "}
                {/* Gender */}
                <div>
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-2">
                      Genre
                    </legend>
                    <div
                      className="grid grid-cols-2 gap-4"
                      role="radiogroup"
                      aria-required="true"
                    >
                      <div>
                        <input
                          type="radio"
                          id="male"
                          value="male"
                          {...register("gender", {
                            required: "Veuillez sélectionner votre genre",
                          })}
                          className="sr-only peer"
                          aria-invalid={errors.gender ? "true" : "false"}
                        />
                        <label
                          htmlFor="male"
                          className={`flex justify-center items-center w-full cursor-pointer rounded-md px-3 py-3 text-center text-sm font-medium border ${
                            watchAll.gender === "male"
                              ? "bg-green-100 text-green-800 border-green-300 ring-2 ring-green-500"
                              : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          Homme
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="female"
                          value="female"
                          {...register("gender", {
                            required: "Veuillez sélectionner votre genre",
                          })}
                          className="sr-only peer"
                          aria-invalid={errors.gender ? "true" : "false"}
                        />
                        <label
                          htmlFor="female"
                          className={`flex justify-center items-center w-full cursor-pointer rounded-md px-3 py-3 text-center text-sm font-medium border ${
                            watchAll.gender === "female"
                              ? "bg-green-100 text-green-800 border-green-300 ring-2 ring-green-500"
                              : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          Femme
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.gender.message}
                    </p>
                  )}
                </div>{" "}
                {/* Cancer type */}
                <div>
                  <label
                    htmlFor="cancerType"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Type de cancer digestif
                  </label>
                  <div className="relative">
                    {" "}
                    <select
                      id="cancerType"
                      {...register("cancerType", {
                        required: "Veuillez sélectionner votre type de cancer",
                      })}
                      className="mt-1 block w-full pl-4 pr-10 py-3 text-base border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md shadow-sm transition-all duration-200 ease-in-out hover:border-gray-400 appearance-none"
                      defaultValue=""
                      aria-invalid={errors.cancerType ? "true" : "false"}
                      aria-describedby={
                        errors.cancerType ? "cancerType-error" : undefined
                      }
                    >
                      <option value="" disabled>
                        Sélectionnez le type
                      </option>
                      <option value="colorectal">Cancer colorectal</option>
                      <option value="pancreas">Cancer du pancréas</option>
                      <option value="gastric">Cancer gastrique</option>
                      <option value="rectum">Cancer du rectum</option>
                      <option value="stomach">Cancer de l'estomac</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 bg-gradient-to-l from-gray-50 to-transparent">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.cancerType && (
                    <p
                      className="mt-2 text-sm text-red-600 flex items-center"
                      id="cancerType-error"
                      role="alert"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {errors.cancerType.message}
                    </p>
                  )}
                </div>{" "}
                {/* Height and Weight */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="height"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Taille (cm)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        id="height"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        {...register("height", {
                          required: "Ce champ est requis",
                          min: {
                            value: 100,
                            message: "Taille minimale: 100 cm",
                          },
                          max: {
                            value: 250,
                            message: "Taille maximale: 250 cm",
                          },
                        })}
                        className="block w-full border border-gray-300 rounded-md py-3 px-4 pr-16 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ease-in-out hover:border-gray-400 text-base"
                        placeholder="175"
                        aria-invalid={errors.height ? "true" : "false"}
                        aria-describedby={
                          errors.height ? "height-error" : undefined
                        }
                      />{" "}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                        <span className="text-gray-500 text-sm">cm</span>
                      </div>
                    </div>{" "}
                    {errors.height && (
                      <p
                        className="mt-2 text-sm text-red-600 flex items-center"
                        id="height-error"
                        role="alert"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {errors.height.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="weight"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Poids (kg)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        id="weight"
                        inputMode="decimal"
                        step="0.1"
                        {...register("weight", {
                          required: "Ce champ est requis",
                          min: { value: 30, message: "Poids minimum: 30 kg" },
                          max: { value: 300, message: "Poids maximum: 300 kg" },
                        })}
                        className="block w-full border border-gray-300 rounded-md py-3 px-4 pr-16 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ease-in-out hover:border-gray-400 text-base"
                        placeholder="70"
                        aria-invalid={errors.weight ? "true" : "false"}
                        aria-describedby={
                          errors.weight ? "weight-error" : undefined
                        }
                      />{" "}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                        <span className="text-gray-500 text-sm">kg</span>
                      </div>
                    </div>{" "}
                    {errors.weight && (
                      <p
                        className="mt-2 text-sm text-red-600 flex items-center"
                        id="weight-error"
                        role="alert"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {errors.weight.message}
                      </p>
                    )}
                  </div>
                </div>{" "}
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      !watchAll.gender ||
                      !watchAll.cancerType ||
                      !watchAll.height ||
                      !watchAll.weight
                    }
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    Suivant
                    <svg
                      className="ml-2 -mr-1 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center border-b border-gray-200 pb-3 mb-1">
                  <svg
                    className="w-5 h-5 mr-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                  Activité physique et perte d'appétit
                </h2>{" "}
                {/* Physical activity */}
                <div>
                  {" "}
                  <label
                    htmlFor="physicalActivity"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Niveau d'activité physique
                  </label>
                  <div className="relative">
                    {" "}
                    <select
                      id="physicalActivity"
                      {...register("physicalActivity", {
                        required:
                          "Veuillez sélectionner votre niveau d'activité",
                      })}
                      className="mt-1 block w-full pl-4 pr-10 py-3 text-base border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md shadow-sm transition-all duration-200 ease-in-out hover:border-gray-400 appearance-none"
                      defaultValue=""
                      aria-invalid={errors.physicalActivity ? "true" : "false"}
                      aria-describedby={
                        errors.physicalActivity
                          ? "physicalActivity-error"
                          : undefined
                      }
                    >
                      <option value="" disabled>
                        Sélectionnez le niveau
                      </option>
                      <option value="sedentary">
                        Sédentaire (peu ou pas d'exercice)
                      </option>
                      <option value="light">
                        Léger (exercice léger 1-3 jours/semaine)
                      </option>
                      <option value="moderate">
                        Modéré (exercice modéré 3-5 jours/semaine)
                      </option>
                      <option value="intense">
                        Intense (exercice intense 6-7 jours/semaine)
                      </option>
                      <option value="very_intense">
                        Très intense (exercice très intense, travail physique)
                      </option>
                    </select>{" "}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 bg-gradient-to-l from-gray-50 to-transparent">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>{" "}
                  {errors.physicalActivity && (
                    <p
                      className="mt-2 text-sm text-red-600 flex items-center"
                      id="physicalActivity-error"
                      role="alert"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {errors.physicalActivity.message}
                    </p>
                  )}
                </div>{" "}
                {/* Anorexia */}
                <div>
                  <div className="relative flex items-start p-5 rounded-lg border border-gray-200 hover:border-amber-200 hover:bg-amber-50 transition-all duration-200 cursor-pointer">
                    <div className="flex items-center h-6">
                      <input
                        id="hasAnorexia"
                        type="checkbox"
                        {...register("hasAnorexia")}
                        className="focus:ring-green-500 h-5 w-5 text-green-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="hasAnorexia"
                        className="font-medium text-gray-700 block mb-1 cursor-pointer"
                      >
                        Perte d'appétit (anorexie)
                      </label>
                      <p className="text-gray-500 text-sm">
                        Avez-vous récemment ressenti une perte d'appétit
                        significative?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-6 mt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      ></path>
                    </svg>
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!watchAll.physicalActivity}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    Suivant
                    <svg
                      className="ml-2 -mr-1 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}{" "}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center border-b border-gray-200 pb-3 mb-1">
                  <svg
                    className="w-5 h-5 mr-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                  Symptômes digestifs
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-6">
                    Sélectionnez les symptômes que vous ressentez:
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative flex items-center p-4 rounded-lg border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                      <div className="flex items-center h-5">
                        <input
                          id="diarrhea"
                          value="diarrhea"
                          type="checkbox"
                          {...register("digestiveSymptoms")}
                          className="focus:ring-green-500 h-5 w-5 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label
                          htmlFor="diarrhea"
                          className="font-medium text-gray-700 cursor-pointer"
                        >
                          Diarrhées
                        </label>
                      </div>
                    </div>{" "}
                    <div className="relative flex items-center p-4 rounded-lg border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                      <div className="flex items-center h-5">
                        <input
                          id="abdominal_pain"
                          value="abdominal_pain"
                          type="checkbox"
                          {...register("digestiveSymptoms")}
                          className="focus:ring-green-500 h-5 w-5 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label
                          htmlFor="abdominal_pain"
                          className="font-medium text-gray-700 cursor-pointer"
                        >
                          Douleurs abdominales
                        </label>
                      </div>
                    </div>
                    <div className="relative flex items-center p-4 rounded-lg border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                      <div className="flex items-center h-5">
                        <input
                          id="dry_mouth"
                          value="dry_mouth"
                          type="checkbox"
                          {...register("digestiveSymptoms")}
                          className="focus:ring-green-500 h-5 w-5 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label
                          htmlFor="dry_mouth"
                          className="font-medium text-gray-700 cursor-pointer"
                        >
                          Sécheresse buccale
                        </label>
                      </div>
                    </div>{" "}
                    <div className="relative flex items-center p-4 rounded-lg border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                      <div className="flex items-center h-5">
                        <input
                          id="nausea_vomiting"
                          value="nausea_vomiting"
                          type="checkbox"
                          {...register("digestiveSymptoms")}
                          className="focus:ring-green-500 h-5 w-5 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label
                          htmlFor="nausea_vomiting"
                          className="font-medium text-gray-700 cursor-pointer"
                        >
                          Nausée et vomissements
                        </label>
                      </div>
                    </div>
                    <div className="relative flex items-center p-4 rounded-lg border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                      <div className="flex items-center h-5">
                        <input
                          id="constipation"
                          value="constipation"
                          type="checkbox"
                          {...register("digestiveSymptoms")}
                          className="focus:ring-green-500 h-5 w-5 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label
                          htmlFor="constipation"
                          className="font-medium text-gray-700 cursor-pointer"
                        >
                          Constipation
                        </label>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-5 border border-blue-200 shadow-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-blue-800">
                        Vos réponses nous aideront à vous proposer des recettes
                        et des conseils adaptés à votre situation.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-6 mt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      ></path>
                    </svg>
                    Précédent
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Traitement...
                      </>
                    ) : (
                      <>
                        Terminer
                        <CheckCircleIcon
                          className="ml-2 -mr-1 h-5 w-5"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
