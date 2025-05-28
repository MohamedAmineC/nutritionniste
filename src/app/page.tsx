import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightCircleIcon,
  CheckCircleIcon,
  UserGroupIcon,
  BeakerIcon,
  HeartIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-teal-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6">
              Nutrition adaptée aux{" "}
              <span className="text-green-600">cancers digestifs</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Des conseils nutritionnels personnalisés pour améliorer votre
              qualité de vie pendant le traitement
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Commencer l'évaluation
                <ArrowRightCircleIcon
                  className="ml-2 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/recipes"
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Explorer les recettes
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md h-80 bg-white rounded-lg shadow-lg overflow-hidden relative">
              <Image
                src="/images/banner.jpg"
                alt="Nutrition pour patients atteints de cancer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Fonctionnalités
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Notre application vous aide à gérer votre nutrition pendant votre
              traitement contre le cancer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircleIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Évaluation personnalisée
              </h3>
              <p className="text-gray-600">
                Recevez une évaluation nutritionnelle adaptée à votre type de
                cancer digestif et à vos symptômes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <BeakerIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Recettes adaptées
              </h3>
              <p className="text-gray-600">
                Découvrez des recettes spécifiquement conçues pour les patients
                atteints de cancer digestif.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CalendarDaysIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Plan de repas
              </h3>
              <p className="text-gray-600">
                Créez un plan de repas hebdomadaire avec des recettes adaptées à
                vos besoins nutritionnels.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <ChartBarIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Suivi nutritionnel
              </h3>
              <p className="text-gray-600">
                Suivez votre apport calorique et vos nutriments au quotidien
                pour atteindre vos objectifs.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <BeakerIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Suivi d'hydratation
              </h3>
              <p className="text-gray-600">
                Gardez une trace de votre consommation d'eau quotidienne,
                essentielle pendant le traitement.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <DocumentArrowDownIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Rapports exportables
              </h3>
              <p className="text-gray-600">
                Générez et exportez des rapports nutritionnels à partager avec
                votre équipe médicale.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <HeartIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Conseils nutritionnels
              </h3>
              <p className="text-gray-600">
                Apprenez comment gérer les symptômes et prévenir la dénutrition
                grâce à nos conseils d'experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Témoignages de patients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Marie L.
                  </h4>
                  <p className="text-sm text-gray-500">Cancer colorectal</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Grâce à cette application, j'ai pu adapter mon alimentation à
                mes symptômes. Les recettes sont faciles à préparer et
                délicieuses, même avec mes problèmes d'appétit."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Pierre T.
                  </h4>
                  <p className="text-sm text-gray-500">Cancer du pancréas</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Les conseils nutritionnels m'ont aidé à maintenir mon poids
                pendant mon traitement. Je me sens mieux informé et soutenu dans
                ma démarche."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-green-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Commencez votre évaluation nutritionnelle dès maintenant
          </h2>
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50"
          >
            Commencer
            <ArrowRightCircleIcon
              className="ml-2 -mr-1 h-5 w-5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-2">
                N
              </div>
              <span className="text-lg font-semibold text-gray-900">
                NutriCancer
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Nutrition personnalisée pour les patients atteints de cancer
              digestif
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Application
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/assessment"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Évaluation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recipes"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Recettes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Légal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Conditions d'utilisation
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NutriCancer. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
