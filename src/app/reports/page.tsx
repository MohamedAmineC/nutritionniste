"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  DocumentArrowDownIcon,
  PrinterIcon,
  ShareIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { PatientData, Recipe, NutritionAdvice, BMICategory } from "../types";
import { calculateBMI, getBMICategory } from "../utils/calculations";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface BMIData {
  bmi: number;
  category: BMICategory;
}

interface CalorieData {
  recommendedCalories: number;
}

export default function ReportsPage() {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [bmiData, setBmiData] = useState<BMIData | null>(null);
  const [calorieData, setCalorieData] = useState<CalorieData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [downloadingPDF, setDownloadingPDF] = useState<boolean>(false);

  useEffect(() => {
    try {
      // Get stored data
      const storedPatientData = localStorage.getItem("patientData");
      const storedBmiData = localStorage.getItem("bmiData");
      const storedCalorieData = localStorage.getItem("calorieData");

      if (!storedPatientData) {
        setIsLoading(false);
        return;
      }

      // Parse stored data
      const parsedPatientData: PatientData = JSON.parse(storedPatientData);
      setPatientData(parsedPatientData);

      if (storedBmiData) {
        const parsedBmiData: BMIData = JSON.parse(storedBmiData);
        setBmiData(parsedBmiData);
      } else {
        // Calculate BMI if not stored
        const bmi = calculateBMI(
          parsedPatientData.weight,
          parsedPatientData.height
        );
        const category = getBMICategory(bmi);
        setBmiData({ bmi, category });
      }

      if (storedCalorieData) {
        const parsedCalorieData: CalorieData = JSON.parse(storedCalorieData);
        setCalorieData(parsedCalorieData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Erreur lors du chargement des données.", {
        toastId: "reports-loading-error",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getGenderLabel = (gender: string): string => {
    return gender === "male" ? "Homme" : "Femme";
  };

  const getCancerTypeLabel = (cancerType: string): string => {
    const labels: { [key: string]: string } = {
      colorectal: "Colorectal",
      pancreas: "Pancréas",
      gastric: "Gastrique",
      rectum: "Rectum",
      stomach: "Estomac",
    };
    return labels[cancerType] || cancerType;
  };

  const getActivityLabel = (activity: string): string => {
    const labels: { [key: string]: string } = {
      sedentary: "Sédentaire",
      light: "Légère",
      moderate: "Modérée",
      intense: "Intense",
      very_intense: "Très intense",
    };
    return labels[activity] || activity;
  };

  const getSymptomLabel = (symptom: string): string => {
    const labels: { [key: string]: string } = {
      diarrhea: "Diarrhée",
      abdominal_pain: "Douleurs abdominales",
      dry_mouth: "Sécheresse buccale",
      nausea_vomiting: "Nausées et vomissements",
      constipation: "Constipation",
    };
    return labels[symptom] || symptom;
  };

  const generatePDF = async () => {
    if (!patientData || !bmiData) return;

    setDownloadingPDF(true);
    toast.info("Génération du PDF en cours...");

    try {
      const reportElement = document.getElementById("nutrition-report");
      if (!reportElement) {
        toast.error("Élément de rapport introuvable.", {
          toastId: "report-element-missing",
        });
        return;
      }

      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate ratio to fit the image within A4 size
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("rapport-nutritionnel.pdf");

      toast.success("Rapport PDF généré avec succès!", {
        toastId: "pdf-generation-success",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Erreur lors de la génération du PDF.", {
        toastId: "pdf-generation-error",
      });
    } finally {
      setDownloadingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!patientData || !bmiData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Données non trouvées
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Veuillez compléter l'évaluation nutritionnelle pour générer un
            rapport.
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

  const currentDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rapport nutritionnel
          </h1>
          <p className="text-lg text-gray-600">
            Résumé de votre évaluation et recommandations
          </p>
        </div>

        <div className="print:hidden flex space-x-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <PrinterIcon className="h-5 w-5 mr-2 text-gray-500" />
            Imprimer
          </button>
          <button
            onClick={generatePDF}
            disabled={downloadingPDF}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            {downloadingPDF ? "Génération..." : "Télécharger PDF"}
          </button>
        </div>
      </div>

      <div
        id="nutrition-report"
        className="bg-white shadow overflow-hidden rounded-lg"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                NutriCancer
              </h2>
              <p className="text-sm text-gray-600">
                Rapport nutritionnel personnalisé
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Date: {currentDate}</p>
              <p className="text-sm text-gray-600">
                Référence: NC-{Math.floor(Math.random() * 10000)}
              </p>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Informations du patient
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Genre</p>
              <p className="mt-1 text-sm text-gray-900">
                {getGenderLabel(patientData.gender)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type de cancer</p>
              <p className="mt-1 text-sm text-gray-900">
                {getCancerTypeLabel(patientData.cancerType)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Poids</p>
              <p className="mt-1 text-sm text-gray-900">
                {patientData.weight} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Taille</p>
              <p className="mt-1 text-sm text-gray-900">
                {patientData.height} cm
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Activité physique</p>
              <p className="mt-1 text-sm text-gray-900">
                {getActivityLabel(patientData.physicalActivity)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Anorexie</p>
              <p className="mt-1 text-sm text-gray-900">
                {patientData.hasAnorexia ? "Oui" : "Non"}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Symptômes digestifs</p>
              {patientData.digestiveSymptoms.length > 0 ? (
                <ul className="mt-1 space-y-1">
                  {patientData.digestiveSymptoms.map((symptom) => (
                    <li key={symptom} className="text-sm text-gray-900">
                      - {getSymptomLabel(symptom)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  Aucun symptôme rapporté
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Assessment Results */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Résultats de l'évaluation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BMI Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                Indice de Masse Corporelle (IMC)
              </h4>
              <div className="flex items-center mb-3">
                <div className="text-2xl font-bold text-gray-900 mr-3">
                  {bmiData.bmi}
                </div>
                <div
                  className={`text-sm font-medium px-2 py-1 rounded ${
                    bmiData.category.classification.includes("Dénutrition")
                      ? "bg-red-100 text-red-800"
                      : bmiData.category.classification === "Normal"
                      ? "bg-green-100 text-green-800"
                      : bmiData.category.classification === "Surpoids"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {bmiData.category.classification}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                Plage: {bmiData.category.range}
              </p>
              <p className="text-sm text-gray-500">
                Risque: {bmiData.category.risk}
              </p>
            </div>

            {/* Calories Section */}
            {calorieData && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Besoins caloriques
                </h4>
                <div className="text-2xl font-bold text-gray-900 mb-3">
                  {calorieData.recommendedCalories} kcal
                </div>
                <p className="text-sm text-gray-500">
                  Recommandation quotidienne basée sur votre profil et votre
                  niveau d'activité physique
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Recommandations nutritionnelles
          </h3>

          {/* General recommendations based on BMI */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">
              Objectifs nutritionnels
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              {bmiData.category.classification.includes("Dénutrition") ? (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    • Augmenter l'apport calorique quotidien pour atteindre un
                    poids santé.
                  </li>
                  <li>
                    • Privilégier les repas riches en calories et en protéines.
                  </li>
                  <li>
                    • Fractionner l'alimentation (6-8 petits repas par jour).
                  </li>
                  <li>
                    • Enrichir les plats (fromage râpé, œuf, crème, huile,
                    etc.).
                  </li>
                  <li>
                    • Utiliser des compléments nutritionnels oraux si
                    nécessaire.
                  </li>
                </ul>
              ) : bmiData.category.classification === "Normal" ? (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Maintenir l'apport calorique actuel.</li>
                  <li>• Assurer un apport protéique suffisant.</li>
                  <li>• Privilégier une alimentation équilibrée et variée.</li>
                  <li>• Rester hydraté (au moins 1,5L d'eau par jour).</li>
                </ul>
              ) : (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    • Réduire progressivement l'apport calorique sans
                    restriction sévère.
                  </li>
                  <li>• Maintenir un apport protéique adéquat.</li>
                  <li>
                    • Favoriser les aliments à haute densité nutritionnelle.
                  </li>
                  <li>
                    • Augmenter progressivement l'activité physique si possible.
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Symptom-specific recommendations */}
          {patientData.digestiveSymptoms.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Conseils adaptés à vos symptômes
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-3 text-sm text-gray-700">
                  {patientData.digestiveSymptoms.includes("diarrhea") && (
                    <li>
                      <strong className="text-gray-900">Diarrhée</strong>
                      <ul className="mt-1 space-y-1 pl-4">
                        <li>
                          • Privilégier les aliments pauvres en fibres (riz
                          blanc, pâtes, pain blanc).
                        </li>
                        <li>
                          • Éviter les aliments gras, épicés et les produits
                          laitiers.
                        </li>
                        <li>
                          • Boire beaucoup pour éviter la déshydratation
                          (bouillons, eau, boissons isotoniques).
                        </li>
                      </ul>
                    </li>
                  )}

                  {patientData.digestiveSymptoms.includes(
                    "nausea_vomiting"
                  ) && (
                    <li>
                      <strong className="text-gray-900">
                        Nausées et vomissements
                      </strong>
                      <ul className="mt-1 space-y-1 pl-4">
                        <li>
                          • Prendre des repas plus petits mais plus fréquents.
                        </li>
                        <li>
                          • Éviter les aliments à forte odeur ou très épicés.
                        </li>
                        <li>
                          • Privilégier les aliments froids ou à température
                          ambiante.
                        </li>
                        <li>
                          • Boire entre les repas plutôt que pendant les repas.
                        </li>
                      </ul>
                    </li>
                  )}

                  {patientData.digestiveSymptoms.includes("dry_mouth") && (
                    <li>
                      <strong className="text-gray-900">
                        Sécheresse buccale
                      </strong>
                      <ul className="mt-1 space-y-1 pl-4">
                        <li>
                          • Ajouter des sauces, des bouillons ou des jus aux
                          aliments.
                        </li>
                        <li>• Boire régulièrement de petites gorgées d'eau.</li>
                        <li>
                          • Utiliser des substituts de salive si recommandé.
                        </li>
                      </ul>
                    </li>
                  )}

                  {patientData.digestiveSymptoms.includes("constipation") && (
                    <li>
                      <strong className="text-gray-900">Constipation</strong>
                      <ul className="mt-1 space-y-1 pl-4">
                        <li>
                          • Augmenter progressivement l'apport en fibres
                          (fruits, légumes, céréales complètes).
                        </li>
                        <li>• Boire suffisamment d'eau.</li>
                        <li>
                          • Pratiquer une activité physique modérée si possible.
                        </li>
                      </ul>
                    </li>
                  )}

                  {patientData.digestiveSymptoms.includes("abdominal_pain") && (
                    <li>
                      <strong className="text-gray-900">
                        Douleurs abdominales
                      </strong>
                      <ul className="mt-1 space-y-1 pl-4">
                        <li>
                          • Éviter les aliments produisant des gaz (choux,
                          légumineuses, boissons gazeuses).
                        </li>
                        <li>• Privilégier les aliments faciles à digérer.</li>
                        <li>• Manger lentement et bien mastiquer.</li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Cancer-specific recommendations */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Recommandations spécifiques au cancer{" "}
              {getCancerTypeLabel(patientData.cancerType)}
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              {patientData.cancerType === "colorectal" && (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    • Privilégier une alimentation riche en protéines et modérée
                    en fibres selon tolérance.
                  </li>
                  <li>
                    • Éviter les aliments irritants en cas de diarrhée ou de
                    selles fréquentes.
                  </li>
                  <li>• Fractionner les repas pour faciliter la digestion.</li>
                </ul>
              )}

              {patientData.cancerType === "pancreas" && (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Suivre un régime pauvre en graisses si prescrit.</li>
                  <li>
                    • Prendre les suppléments d'enzymes pancréatiques si
                    prescrits.
                  </li>
                  <li>
                    • Fractionner l'alimentation en petits repas fréquents pour
                    faciliter la digestion.
                  </li>
                </ul>
              )}

              {patientData.cancerType === "gastric" && (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    • Privilégier les petits repas fréquents pour éviter la
                    distension gastrique.
                  </li>
                  <li>• Manger lentement et bien mastiquer.</li>
                  <li>• Éviter les aliments irritants et acides.</li>
                </ul>
              )}

              {patientData.cancerType === "rectum" && (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    • Adapter l'apport en fibres selon les symptômes
                    intestinaux.
                  </li>
                  <li>
                    • Éviter les aliments qui aggravent les symptômes digestifs.
                  </li>
                  <li>
                    • Boire suffisamment d'eau pour maintenir des selles
                    régulières.
                  </li>
                </ul>
              )}

              {patientData.cancerType === "stomach" && (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    • Privilégier les petits repas fréquents (6-8 par jour).
                  </li>
                  <li>• Éviter les aliments épicés, acides et irritants.</li>
                  <li>
                    • Rester assis pendant au moins 30 minutes après les repas.
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 text-center text-xs text-gray-500 bg-gray-50">
          <p>
            Ce rapport est généré automatiquement à partir des données fournies
            par l'utilisateur.
          </p>
          <p className="mt-1">
            Il ne remplace pas l'avis d'un professionnel de santé qualifié.
          </p>
          <p className="mt-2">
            NutriCancer - Application de soutien nutritionnel pour patients
            atteints de cancer digestif
          </p>
        </div>
      </div>
    </div>
  );
}
