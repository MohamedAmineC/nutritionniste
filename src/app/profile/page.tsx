"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  UserIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { PatientData } from "../types";
import { calculateBMI, getBMICategory } from "../utils/calculations";

export default function ProfilePage() {
  const router = useRouter();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      // Get stored data
      const storedPatientData = localStorage.getItem("patientData");

      if (!storedPatientData) {
        setIsLoading(false);
        return;
      }

      // Parse stored data
      const parsedPatientData: PatientData = JSON.parse(storedPatientData);
      setPatientData(parsedPatientData);
    } catch (error) {
      console.error("Error loading patient data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteProfile = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer votre profil ? Toutes vos données seront perdues."
      )
    ) {
      localStorage.removeItem("patientData");
      localStorage.removeItem("bmiData");
      localStorage.removeItem("calorieData");

      toast.success("Profil supprimé avec succès");
      setPatientData(null);
    }
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
          <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
            <UserIcon className="h-12 w-12 text-gray-400" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Profil non trouvé
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Vous n'avez pas encore créé de profil.
          </p>
          <Link
            href="/assessment"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Créer un profil
          </Link>
        </div>
      </div>
    );
  }

  // Calculate BMI for display
  const bmi = calculateBMI(patientData.weight, patientData.height);
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Profil du patient
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Vos informations personnelles et détails nutritionnels.
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href="/assessment"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <PencilSquareIcon
                className="-ml-0.5 mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Modifier
            </Link>
          </div>
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
                Taille / Poids
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {patientData.height} cm / {patientData.weight} kg
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">IMC</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{bmi}</span>
                  <span
                    className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bmi < 18.5
                        ? "bg-red-100 text-red-800"
                        : bmi >= 18.5 && bmi < 25
                        ? "bg-green-100 text-green-800"
                        : bmi >= 25 && bmi < 30
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {bmiCategory.classification}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{bmiCategory.risk}</p>
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
                {patientData.digestiveSymptoms.length === 0 ? (
                  <span>Aucun symptôme rapporté</span>
                ) : (
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {patientData.digestiveSymptoms.includes("diarrhea") && (
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          Diarrhées
                        </div>
                      </li>
                    )}
                    {patientData.digestiveSymptoms.includes(
                      "abdominal_pain"
                    ) && (
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          Douleurs abdominales
                        </div>
                      </li>
                    )}
                    {patientData.digestiveSymptoms.includes("dry_mouth") && (
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          Sécheresse buccale
                        </div>
                      </li>
                    )}
                    {patientData.digestiveSymptoms.includes(
                      "nausea_vomiting"
                    ) && (
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          Nausées et vomissements
                        </div>
                      </li>
                    )}
                    {patientData.digestiveSymptoms.includes("constipation") && (
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          Constipation
                        </div>
                      </li>
                    )}
                  </ul>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Data Management */}
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Gestion des données
          </h2>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Mettre à jour votre profil
              </h3>
              <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                <div className="max-w-xl text-sm text-gray-500">
                  <p>
                    Si votre état a changé ou si vous souhaitez mettre à jour
                    vos informations, vous pouvez refaire l'évaluation.
                  </p>
                </div>
                <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                  <Link
                    href="/assessment"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <ArrowPathIcon
                      className="-ml-0.5 mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Mettre à jour
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Zone de danger
                </h3>
                <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                  <div className="max-w-xl text-sm text-gray-500">
                    <p>
                      La suppression de votre profil effacera définitivement
                      toutes vos données stockées localement.
                    </p>
                  </div>
                  <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                    <button
                      type="button"
                      onClick={handleDeleteProfile}
                      className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <ExclamationTriangleIcon
                        className="-ml-0.5 mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Supprimer le profil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
