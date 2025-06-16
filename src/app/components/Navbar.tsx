"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  BookOpenIcon,
  ChartPieIcon,
  BeakerIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navigation = [
    { name: "Accueil", href: "/", icon: HomeIcon },
    {
      name: "Évaluation",
      href: "/assessment",
      icon: ClipboardDocumentCheckIcon,
    },
    { name: "Profil", href: "/profile", icon: UserIcon },
    { name: "Recettes", href: "/recipes", icon: BookOpenIcon },
    { name: "Tableau de bord", href: "/dashboard", icon: ChartPieIcon },
    { name: "Plan de repas", href: "/meal-planner", icon: CalendarIcon },
    { name: "Suivi nutrition", href: "/nutrition-tracker", icon: ChartPieIcon },
    { name: "Hydratation", href: "/water-tracker", icon: BeakerIcon },
    { name: "Rapports", href: "/reports", icon: ClipboardDocumentCheckIcon },
  ];

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav
        className="mx-auto flex max-w-8xl items-center justify-between p-3 lg:px-6"
        aria-label="Global"
      >
        <div className="flex items-center lg:flex-none mr-4">
          <Link href="/" className="p-1.5 flex items-center">
            <span className="sr-only">Nutritionniste Cancer Digestif</span>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold mr-3">
              N
            </div>
            <span className="text-lg md:text-xl font-semibold text-gray-900 whitespace-nowrap">
              NutriCancer
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center text-sm font-medium whitespace-nowrap px-2.5 py-1.5 rounded-md transition duration-150 ${
                  pathname === item.href
                    ? "text-green-600 font-semibold bg-green-50 shadow-sm"
                    : "text-gray-700 hover:text-green-600 hover:bg-green-50/50"
                }`}
              >
                <item.icon className="h-4 w-4 mr-1.5" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="p-1.5 flex items-center">
              <span className="sr-only">Nutritionniste Cancer Digestif</span>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold mr-4">
                N
              </div>
              <span className="text-xl font-semibold text-gray-900">
                NutriCancer
              </span>
            </Link>
            <button
              type="button"
              className="rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fermer le menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="divide-y divide-gray-100">
              <div className="space-y-1 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center rounded-lg px-4 py-2.5 text-base font-medium transition duration-150 ${
                      pathname === item.href
                        ? "bg-green-50 text-green-600 shadow-sm"
                        : "text-gray-800 hover:bg-gray-50 hover:text-green-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  );
}
