import {
  DigestiveCancerType,
  DigestiveSymptom,
  NutritionAdvice,
  Recipe,
} from "../types";

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Smoothie énergétique à la banane",
    description:
      "Un smoothie riche en calories et facile à digérer, idéal pour les patients ayant des difficultés à manger.",
    ingredients: [
      "1 banane mûre",
      "250ml de lait d'amande enrichi",
      "1 cuillère à soupe de beurre d'amande",
      "1 cuillère à soupe de miel",
      "1/2 cuillère à café de cannelle",
      "Glaçons (optionnel)",
    ],
    instructions: [
      "Mettre tous les ingrédients dans un mixeur.",
      "Mixer jusqu'à obtenir une consistance lisse.",
      "Servir immédiatement.",
    ],
    imageUrl: "/images/recipes/banana-smoothie.jpg",
    nutritionFacts: {
      calories: 350,
      protein: 8,
      carbs: 45,
      fat: 14,
      fiber: 5,
    },
    suitableFor: {
      symptoms: ["dry_mouth", "nausea_vomiting"],
      cancerTypes: ["colorectal", "pancreas", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "2",
    title: "Soupe de carottes au gingembre",
    description:
      "Une soupe légère et apaisante, riche en antioxydants et en nutriments.",
    ingredients: [
      "500g de carottes pelées et coupées en morceaux",
      "1 oignon émincé",
      "2 gousses d'ail écrasées",
      "1 cuillère à café de gingembre frais râpé",
      "750ml de bouillon de légumes",
      "2 cuillères à soupe d'huile d'olive",
      "Sel et poivre selon goût",
      "2 cuillères à soupe de crème fraîche (optionnel)",
    ],
    instructions: [
      "Dans une casserole, faire revenir l'oignon dans l'huile d'olive jusqu'à ce qu'il devienne translucide.",
      "Ajouter l'ail et le gingembre, cuire pendant 1 minute.",
      "Ajouter les carottes et le bouillon, porter à ébullition.",
      "Réduire le feu et laisser mijoter pendant 20-25 minutes jusqu'à ce que les carottes soient tendres.",
      "Mixer la soupe jusqu'à obtenir une consistance lisse.",
      "Assaisonner avec sel et poivre, et ajouter la crème fraîche si désirée.",
    ],
    imageUrl: "/images/recipes/soupe-carottes.jpg",
    nutritionFacts: {
      calories: 180,
      protein: 3,
      carbs: 22,
      fat: 9,
      fiber: 6,
    },
    suitableFor: {
      symptoms: ["nausea_vomiting", "abdominal_pain"],
      cancerTypes: ["colorectal", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "3",
    title: "Poulet aux herbes et riz blanc",
    description:
      "Un plat doux pour l'estomac, facile à digérer et riche en protéines.",
    ingredients: [
      "200g de blanc de poulet",
      "1 tasse de riz blanc",
      "2 cuillères à soupe d'huile d'olive",
      "1 cuillère à soupe de romarin frais haché",
      "1 cuillère à soupe de thym frais haché",
      "Sel et poivre (en quantité modérée)",
      "2 tasses d'eau ou de bouillon de poulet faible en sodium",
    ],
    instructions: [
      "Cuire le riz selon les instructions du paquet avec une pincée de sel.",
      "Assaisonner le poulet avec les herbes, un peu de sel et de poivre.",
      "Dans une poêle, chauffer l'huile d'olive et cuire le poulet à feu moyen pendant 6-7 minutes de chaque côté.",
      "Laisser reposer le poulet 5 minutes avant de le trancher.",
      "Servir le poulet tranché sur le riz.",
    ],
    imageUrl: "/images/recipes/herbed-chicken-rice.jpg",
    nutritionFacts: {
      calories: 420,
      protein: 35,
      carbs: 40,
      fat: 12,
      fiber: 1,
    },
    suitableFor: {
      symptoms: ["diarrhea", "constipation"],
      cancerTypes: ["colorectal", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "4",
    title: "Purée de pommes de terre à la carotte",
    description:
      "Une purée crémeuse et nutritive, riche en calories et facile à avaler, préparée avec des ingrédients facilement disponibles en Tunisie.",
    ingredients: [
      "400g de pommes de terre",
      "150g de carottes",
      "100ml de lait entier chaud",
      "2 cuillères à soupe d'huile d'olive extra vierge",
      "1 cuillère à soupe de beurre",
      "Sel (en quantité modérée)",
      "Une pincée de cumin moulu (optionnel)",
    ],
    instructions: [
      "Peler et couper les pommes de terre et les carottes en morceaux.",
      "Faire cuire dans de l'eau bouillante salée jusqu'à ce qu'elles soient tendres (environ 15-20 minutes).",
      "Égoutter et remettre dans la casserole sur feu doux pour évaporer l'excès d'humidité.",
      "Écraser les pommes de terre et les carottes avec un presse-purée.",
      "Incorporer le lait chaud, l'huile d'olive et le beurre jusqu'à obtenir la consistance désirée.",
      "Assaisonner légèrement avec du sel et du cumin si désiré.",
    ],
    imageUrl: "/images/recipes/potato-carrot-mash.jpg",
    nutritionFacts: {
      calories: 240,
      protein: 4,
      carbs: 35,
      fat: 10,
      fiber: 5,
    },
    suitableFor: {
      symptoms: ["dry_mouth", "abdominal_pain", "constipation"],
      cancerTypes: ["colorectal", "pancreas", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "5",
    title: "Compote de pommes à la cannelle",
    description:
      "Un dessert doux et réconfortant, facile à digérer et riche en fibres solubles.",
    ingredients: [
      "4 pommes (variétés douces comme Gala ou Golden), pelées et coupées en morceaux",
      "2 cuillères à soupe d'eau",
      "1 cuillère à soupe de miel",
      "1/2 cuillère à café de cannelle",
      "Jus d'un demi-citron",
    ],
    instructions: [
      "Dans une casserole, mélanger les morceaux de pomme, l'eau, le miel, et la cannelle.",
      "Cuire à feu doux en remuant occasionnellement, jusqu'à ce que les pommes soient tendres (environ 15-20 minutes).",
      "Écraser légèrement les pommes pour obtenir la consistance désirée.",
      "Ajouter le jus de citron et mélanger.",
      "Laisser refroidir avant de servir ou conserver au réfrigérateur.",
    ],
    imageUrl: "/images/recipes/apple-compote.jpg",
    nutritionFacts: {
      calories: 120,
      protein: 0,
      carbs: 32,
      fat: 0,
      fiber: 4,
    },
    suitableFor: {
      symptoms: ["diarrhea", "constipation", "nausea_vomiting"],
      cancerTypes: ["colorectal", "pancreas", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "6",
    title: "Chorba aux légumes",
    description:
      "Une soupe traditionnelle tunisienne légère et nourrissante, adaptée pour les patients ayant des problèmes digestifs.",
    ingredients: [
      "100g de pâtes orzo (ou lsan asfour)",
      "1 oignon finement haché",
      "2 carottes coupées en petits dés",
      "2 courgettes coupées en petits dés",
      "1 branche de céleri émincée",
      "1 tomate pelée et coupée en dés",
      "1 litre de bouillon de légumes ou de poulet faible en sodium",
      "2 cuillères à soupe d'huile d'olive",
      "1 cuillère à café de concentré de tomate",
      "1/2 cuillère à café de cumin moulu",
      "1/4 cuillère à café de cannelle",
      "Persil frais haché",
      "Jus d'un demi-citron",
      "Sel et poivre (en quantité limitée)",
    ],
    instructions: [
      "Dans une grande casserole, faire chauffer l'huile d'olive à feu moyen.",
      "Ajouter l'oignon et faire revenir jusqu'à ce qu'il soit translucide.",
      "Ajouter les carottes, les courgettes et le céleri, faire revenir pendant 5 minutes.",
      "Ajouter la tomate et le concentré de tomate, mélanger.",
      "Verser le bouillon et porter à ébullition.",
      "Assaisonner avec le cumin, la cannelle, un peu de sel et de poivre.",
      "Réduire le feu et laisser mijoter pendant 15 minutes.",
      "Ajouter les pâtes et cuire selon le temps indiqué sur l'emballage.",
      "Avant de servir, ajouter le persil haché et le jus de citron.",
    ],
    imageUrl: "/images/recipes/vegetable-chorba.webp",
    nutritionFacts: {
      calories: 220,
      protein: 6,
      carbs: 30,
      fat: 8,
      fiber: 5,
    },
    suitableFor: {
      symptoms: ["nausea_vomiting", "dry_mouth"],
      cancerTypes: ["colorectal", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "7",
    title: "Tajine tunisien aux légumes",
    description:
      "Version douce du tajine tunisien traditionnel, sans friture et adaptée aux troubles digestifs.",
    ingredients: [
      "6 œufs",
      "200g de viande de poulet hachée fine (optionnel)",
      "1 oignon finement haché",
      "1 courgette râpée et pressée pour enlever l'excès d'eau",
      "1 carotte râpée",
      "50g de fromage râpé doux",
      "2 cuillères à soupe de persil haché",
      "2 cuillères à soupe d'huile d'olive",
      "1/2 cuillère à café de curcuma",
      "Sel et poivre (en quantité limitée)",
    ],
    instructions: [
      "Préchauffer le four à 180°C.",
      "Si vous utilisez du poulet, le faire cuire dans une poêle avec un peu d'huile d'olive jusqu'à ce qu'il soit bien cuit.",
      "Dans un saladier, battre les œufs.",
      "Ajouter l'oignon, la courgette, la carotte, le persil, le curcuma et le poulet cuit (si utilisé).",
      "Assaisonner légèrement avec du sel et du poivre, puis mélanger.",
      "Verser le mélange dans un plat allant au four préalablement huilé.",
      "Saupoudrer de fromage râpé.",
      "Cuire au four pendant environ 25-30 minutes jusqu'à ce que le tajine soit bien doré et ferme.",
      "Laisser refroidir légèrement avant de couper en portions.",
    ],
    imageUrl: "/images/recipes/tunisian-vegetable-tajine.jpg",
    nutritionFacts: {
      calories: 280,
      protein: 18,
      carbs: 8,
      fat: 20,
      fiber: 2,
    },
    suitableFor: {
      symptoms: ["constipation", "dry_mouth"],
      cancerTypes: ["colorectal", "pancreas", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "8",
    title: "Couscous blanc léger",
    description:
      "Version douce et apaisante du couscous traditionnel tunisien, idéale pour les estomacs sensibles.",
    ingredients: [
      "200g de couscous fin",
      "300ml d'eau",
      "2 cuillères à soupe d'huile d'olive",
      "1 blanc de poulet cuit et émietté",
      "2 carottes coupées en petits dés et cuites à la vapeur",
      "1 courgette coupée en petits dés et cuite à la vapeur",
      "1 petit navet coupé en petits dés et cuit à la vapeur",
      "1 bouillon de poulet faible en sodium",
      "1 cuillère à café de curcuma",
      "Sel et poivre (en quantité limitée)",
    ],
    instructions: [
      "Dans un grand bol, verser le couscous et l'arroser d'une cuillère à soupe d'huile d'olive. Mélanger avec les doigts pour bien enrober les grains.",
      "Porter l'eau à ébullition et la verser sur le couscous. Couvrir et laisser gonfler pendant 5 minutes.",
      "Égrainer le couscous à l'aide d'une fourchette.",
      "Pendant ce temps, préparer un bouillon léger en diluant le cube de bouillon de poulet dans 500ml d'eau chaude et en ajoutant le curcuma.",
      "Dans une poêle, faire chauffer le reste de l'huile d'olive et faire revenir brièvement les légumes cuits et le poulet émietté.",
      "Servir le couscous dans des bols, disposer les légumes et le poulet par-dessus.",
      "Arroser d'un peu de bouillon selon la préférence.",
    ],
    imageUrl: "/images/recipes/light-couscous.jpg",
    nutritionFacts: {
      calories: 320,
      protein: 20,
      carbs: 45,
      fat: 8,
      fiber: 4,
    },
    suitableFor: {
      symptoms: ["constipation", "abdominal_pain"],
      cancerTypes: ["colorectal", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "9",
    title: "Bouillie de Zgougou modifiée",
    description:
      "Version adaptée de la traditionnelle Assida Zgougou tunisienne, plus douce et digeste pour les patients sous traitement.",
    ingredients: [
      "50g de poudre de zgougou (graines de pin d'Alep moulues)",
      "2 cuillères à soupe de farine de riz",
      "500ml de lait faible en matières grasses",
      "2 cuillères à soupe de miel",
      "1 cuillère à café d'eau de fleur d'oranger",
      "Cannelle moulue pour saupoudrer",
    ],
    instructions: [
      "Dans une casserole, mélanger la poudre de zgougou et la farine de riz.",
      "Ajouter progressivement le lait froid en remuant constamment pour éviter les grumeaux.",
      "Placer sur feu moyen et cuire en remuant constamment jusqu'à épaississement (environ 10-15 minutes).",
      "Retirer du feu, ajouter le miel et l'eau de fleur d'oranger, bien mélanger.",
      "Servir tiède ou froid, saupoudré de cannelle.",
    ],
    imageUrl: "/images/recipes/zgougou-pudding.jpg",
    nutritionFacts: {
      calories: 210,
      protein: 5,
      carbs: 28,
      fat: 10,
      fiber: 2,
    },
    suitableFor: {
      symptoms: ["constipation", "nausea_vomiting", "dry_mouth"],
      cancerTypes: ["colorectal", "pancreas", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "10",
    title: "Soupe de lentilles corail à la menthe",
    description:
      "Une soupe nourrissante et digeste à base de lentilles corail, qui se cuisent rapidement sans trempage préalable.",
    ingredients: [
      "200g de lentilles corail",
      "1 carotte finement coupée",
      "1 oignon finement haché",
      "2 gousses d'ail écrasées",
      "1 cuillère à café de cumin moulu",
      "1/2 cuillère à café de curcuma",
      "1 litre de bouillon de légumes faible en sodium",
      "2 cuillères à soupe d'huile d'olive",
      "Jus d'un demi-citron",
      "2 cuillères à soupe de menthe fraîche hachée",
      "Sel et poivre (en quantité limitée)",
    ],
    instructions: [
      "Dans une grande casserole, faire chauffer l'huile d'olive à feu moyen.",
      "Ajouter l'oignon et faire revenir jusqu'à ce qu'il soit translucide (environ 5 minutes).",
      "Ajouter l'ail, la carotte, le cumin et le curcuma, faire revenir pendant 2 minutes.",
      "Rincer les lentilles corail et les ajouter à la casserole.",
      "Verser le bouillon, porter à ébullition puis réduire à feu doux.",
      "Couvrir et laisser mijoter pendant environ 20 minutes jusqu'à ce que les lentilles soient tendres.",
      "Mixer la soupe pour obtenir une consistance lisse.",
      "Avant de servir, ajouter le jus de citron et saupoudrer de menthe fraîche hachée.",
    ],
    imageUrl: "/images/recipes/red-lentil-mint-soup.jpg",
    nutritionFacts: {
      calories: 250,
      protein: 14,
      carbs: 35,
      fat: 7,
      fiber: 8,
    },
    suitableFor: {
      symptoms: ["constipation", "dry_mouth"],
      cancerTypes: ["colorectal", "pancreas", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "11",
    title: "Crème de potiron au cumin",
    description:
      "Un velouté réconfortant à base de potiron ('garaa'), légume très répandu en Tunisie et facile à digérer.",
    ingredients: [
      "500g de potiron épluché et coupé en cubes",
      "1 pomme de terre moyenne, épluchée et coupée en cubes",
      "1 oignon doux émincé",
      "1 gousse d'ail écrasée",
      "750ml de bouillon de légumes ou de poulet faible en sodium",
      "2 cuillères à soupe d'huile d'olive",
      "1/2 cuillère à café de cumin moulu",
      "1/4 cuillère à café de cannelle",
      "100ml de lait (ou lait d'amande)",
      "Quelques graines de cumin pour la garniture (optionnel)",
      "Sel et poivre (en quantité limitée)",
    ],
    instructions: [
      "Dans une grande casserole, faire chauffer l'huile d'olive à feu moyen.",
      "Faire revenir l'oignon pendant 5 minutes, puis ajouter l'ail et cuire encore 1 minute.",
      "Ajouter le potiron et la pomme de terre, remuer pour enrober d'huile.",
      "Ajouter le cumin et la cannelle, puis verser le bouillon.",
      "Porter à ébullition, puis réduire à feu doux et couvrir.",
      "Laisser mijoter pendant 20-25 minutes, jusqu'à ce que les légumes soient tendres.",
      "Mixer la soupe jusqu'à obtenir une consistance lisse.",
      "Remettre sur feu doux et ajouter le lait, réchauffer sans faire bouillir.",
      "Assaisonner légèrement avec du sel et du poivre.",
      "Servir saupoudré de quelques graines de cumin si désiré.",
    ],
    imageUrl: "/images/recipes/pumpkin-cumin-soup.jpg",
    nutritionFacts: {
      calories: 190,
      protein: 4,
      carbs: 25,
      fat: 9,
      fiber: 4,
    },
    suitableFor: {
      symptoms: ["nausea_vomiting", "dry_mouth", "constipation"],
      cancerTypes: ["colorectal", "pancreas", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "12",
    title: "Mloukhiya douce",
    description:
      "Version adaptée du plat tunisien traditionnel, préparée avec moins d'épices et une cuisson plus longue pour faciliter la digestion.",
    ingredients: [
      "100g de mloukhiya séchée en poudre",
      "300g de viande de veau ou d'agneau coupée en petits morceaux (ou poulet)",
      "1 oignon finement haché",
      "3 gousses d'ail écrasées",
      "2 cuillères à soupe d'huile d'olive",
      "1 cuillère à café de coriandre en poudre",
      "1/2 cuillère à café de cumin",
      "1 bâton de cannelle",
      "1,5 litre de bouillon de viande faible en sodium",
      "Jus d'un demi-citron (à ajouter au moment de servir)",
      "Sel (en quantité limitée)",
    ],
    instructions: [
      "Dans une grande casserole, faire chauffer l'huile d'olive et faire revenir la viande jusqu'à ce qu'elle soit bien dorée.",
      "Ajouter l'oignon et faire revenir jusqu'à ce qu'il devienne translucide.",
      "Ajouter l'ail et les épices, faire revenir pendant 1 minute.",
      "Incorporer la poudre de mloukhiya et bien mélanger pour enrober la viande et les oignons.",
      "Verser le bouillon chaud petit à petit en remuant constamment.",
      "Porter à ébullition, puis réduire à feu doux.",
      "Couvrir et laisser mijoter pendant 1h30 à 2 heures, en remuant de temps en temps, jusqu'à ce que la viande soit très tendre.",
      "Si nécessaire, ajouter un peu d'eau chaude pour maintenir la consistance souhaitée.",
      "Ajuster l'assaisonnement avec un peu de sel si nécessaire.",
      "Servir avec un peu de jus de citron frais et du riz blanc au lieu du pain traditionnel.",
    ],
    imageUrl: "/images/recipes/mild-mloukhiya.jpg",
    nutritionFacts: {
      calories: 280,
      protein: 22,
      carbs: 18,
      fat: 13,
      fiber: 7,
    },
    suitableFor: {
      symptoms: ["dry_mouth", "constipation"],
      cancerTypes: ["colorectal", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "13",
    title: "Salade de carottes à l'orange",
    description:
      "Une salade rafraîchissante et douce, parfaite comme accompagnement ou collation légère.",
    ingredients: [
      "4 carottes moyennes, pelées et râpées",
      "Le jus d'une orange",
      "Le zeste d'une demi-orange (bio de préférence)",
      "2 cuillères à soupe d'huile d'olive extra vierge",
      "1 cuillère à café de miel",
      "1/2 cuillère à café de cannelle",
      "1 cuillère à soupe de feuilles de menthe fraîche hachées",
      "1 cuillère à soupe de persil frais haché",
      "Une pincée de sel",
    ],
    instructions: [
      "Dans un saladier, mélanger les carottes râpées avec le zeste d'orange.",
      "Dans un petit bol, préparer la vinaigrette en mélangeant le jus d'orange, l'huile d'olive, le miel et la cannelle.",
      "Verser la vinaigrette sur les carottes et bien mélanger.",
      "Ajouter la menthe et le persil hachés.",
      "Assaisonner avec une pincée de sel et mélanger délicatement.",
      "Laisser reposer au réfrigérateur pendant 30 minutes avant de servir pour permettre aux saveurs de se développer.",
    ],
    imageUrl: "/images/recipes/carrot-orange-salad.jpg",
    nutritionFacts: {
      calories: 120,
      protein: 1,
      carbs: 14,
      fat: 7,
      fiber: 3,
    },
    suitableFor: {
      symptoms: ["constipation", "dry_mouth", "nausea_vomiting"],
      cancerTypes: ["colorectal", "pancreas", "gastric", "rectum", "stomach"],
    },
  },
  {
    id: "14",
    title: "Riz au poulet et légumes doux",
    description:
      "Un plat complet et équilibré, facile à digérer et préparé avec des ingrédients disponibles partout en Tunisie.",
    ingredients: [
      "250g de riz blanc",
      "200g de blanc de poulet coupé en petits morceaux",
      "1 carotte coupée en petits dés",
      "1 courgette coupée en petits dés",
      "1/2 poivron rouge épépiné et coupé en petits dés",
      "1 petit oignon finement haché",
      "1 gousse d'ail écrasée",
      "500ml de bouillon de poulet faible en sodium",
      "2 cuillères à soupe d'huile d'olive",
      "1/2 cuillère à café de curcuma",
      "1 feuille de laurier",
      "Sel et poivre (en quantité limitée)",
    ],
    instructions: [
      "Rincer le riz à l'eau froide jusqu'à ce que l'eau soit claire.",
      "Dans une grande casserole, faire chauffer l'huile d'olive à feu moyen.",
      "Ajouter l'oignon et l'ail, faire revenir jusqu'à ce qu'ils soient translucides.",
      "Ajouter le poulet et cuire jusqu'à ce qu'il change de couleur (environ 5 minutes).",
      "Ajouter les légumes et cuire pendant 3 minutes supplémentaires.",
      "Incorporer le riz et remuer pour bien l'enrober d'huile.",
      "Ajouter le curcuma et la feuille de laurier.",
      "Verser le bouillon et porter à ébullition.",
      "Réduire le feu, couvrir et laisser mijoter pendant environ 18 minutes jusqu'à ce que le riz soit tendre et ait absorbé tout le liquide.",
      "Retirer du feu et laisser reposer couvert pendant 5 minutes.",
      "Retirer la feuille de laurier avant de servir.",
    ],
    imageUrl: "/images/recipes/chicken-vegetable-rice.webp",
    nutritionFacts: {
      calories: 380,
      protein: 25,
      carbs: 50,
      fat: 10,
      fiber: 3,
    },
    suitableFor: {
      symptoms: ["dry_mouth", "diarrhea", "abdominal_pain"],
      cancerTypes: ["colorectal", "gastric", "rectum", "stomach"],
    },
  },
];

export const nutritionAdvice: NutritionAdvice[] = [
  {
    id: "1",
    title: "Gestion des nausées pendant le traitement",
    content: `
      Les nausées sont un effet secondaire courant des traitements contre le cancer. Voici quelques conseils qui peuvent aider:

      • Mangez de petits repas fréquents au lieu de trois grands repas.
      • Évitez les aliments frits, gras ou très épicés.
      • Mangez des aliments froids ou à température ambiante pour réduire les odeurs qui peuvent déclencher des nausées.
      • Essayez de boire du gingembre sous forme de thé ou de soda au gingembre.
      • Restez bien hydraté en buvant régulièrement de petites quantités de liquides clairs.
      • Évitez de vous allonger immédiatement après avoir mangé.
    `,
    forSymptoms: ["nausea_vomiting"],
    imageUrl: "/images/advice/managing-nausea.jpg",
    priority: 5,
  },
  {
    id: "2",
    title: "Prévention de la dénutrition",
    content: `
      La dénutrition est un risque important pour les patients atteints de cancer. Pour la prévenir:

      • Enrichissez vos plats avec des ingrédients caloriques comme de l'huile d'olive, du beurre, du fromage râpé.
      • Incluez des sources de protéines à chaque repas: œufs, produits laitiers, viande, poisson, légumineuses.
      • Utilisez des compléments nutritionnels oraux si nécessaire (consultez votre médecin).
      • Mangez quand vous avez faim, même si ce n'est pas l'heure des repas.
      • Gardez des collations nutritives à portée de main.
      • Restez actif physiquement dans la mesure du possible pour maintenir votre masse musculaire.
    `,
    imageUrl: "/images/advice/preventing-malnutrition.jpg",
    priority: 4,
  },
  {
    id: "3",
    title: "Comment gérer la diarrhée",
    content: `
      La diarrhée peut être causée par les traitements ou la maladie elle-même. Pour la gérer:

      • Buvez beaucoup de liquides clairs pour éviter la déshydratation.
      • Optez pour un régime BRAT: Bananes, Riz blanc, Compote de pommes, Toast blanc.
      • Évitez les aliments riches en fibres insolubles, les produits laitiers, les aliments épicés, gras ou frits.
      • Mangez des aliments à température ambiante plutôt que très chauds ou très froids.
      • Consommez des aliments riches en potassium comme les bananes et les pommes de terre.
      • Consultez votre médecin si la diarrhée persiste plus de 24 heures.
    `,
    forSymptoms: ["diarrhea"],
    imageUrl: "/images/advice/managing-diarrhea.jpg",
    priority: 5,
  },
  {
    id: "4",
    title: "Soulager la sécheresse buccale",
    content: `
      La sécheresse buccale (xérostomie) est courante pendant certains traitements. Pour la soulager:

      • Sirotez de l'eau fréquemment tout au long de la journée.
      • Utilisez des substituts de salive recommandés par votre médecin.
      • Sucez des bonbons sans sucre ou mâchez du chewing-gum sans sucre pour stimuler la production de salive.
      • Humidifiez les aliments secs avec des sauces, des bouillons ou des jus.
      • Évitez les aliments épicés, salés ou acides qui peuvent irriter une bouche sèche.
      • Utilisez un humidificateur dans votre chambre pendant la nuit.
    `,
    forSymptoms: ["dry_mouth"],
    imageUrl: "/images/advice/dry-mouth-relief.jpg",
    priority: 4,
  },
  {
    id: "5",
    title: "Gérer la constipation",
    content: `
      La constipation peut être causée par certains médicaments ou par la réduction de l'activité physique. Pour la soulager:

      • Augmentez progressivement votre consommation de fibres (fruits, légumes, céréales complètes).
      • Buvez suffisamment d'eau (au moins 8 verres par jour).
      • Soyez physiquement actif dans la mesure du possible.
      • Essayez d'établir une routine régulière pour aller aux toilettes.
      • Consultez votre médecin avant de prendre des laxatifs.
    `,
    forSymptoms: ["constipation"],
    imageUrl: "/images/advice/managing-constipation.jpg",
    priority: 4,
  },
  {
    id: "6",
    title: "Alimentation adaptée aux douleurs abdominales",
    content: `
      Pour gérer les douleurs abdominales:

      • Privilégiez les aliments faciles à digérer (purées, soupes, viandes tendres).
      • Mangez lentement et mastiquez bien.
      • Évitez les aliments connus pour causer des ballonnements (légumineuses, choux, oignons).
      • Optez pour des repas plus petits mais plus fréquents.
      • Limitez les boissons gazeuses et évitez d'utiliser des pailles qui peuvent introduire de l'air.
      • Évitez les aliments très chauds ou très froids qui peuvent provoquer des spasmes.
    `,
    forSymptoms: ["abdominal_pain"],
    imageUrl: "/images/advice/abdominal-pain-diet.jpg",
    priority: 4,
  },
  {
    id: "7",
    title: "L'hydratation adaptée au climat tunisien",
    content: `
      L'hydratation est particulièrement cruciale dans le climat chaud de la Tunisie, surtout pendant le traitement:

      • Visez à boire au moins 2 litres d'eau par jour, plus lors des journées très chaudes.
      • L'eau est toujours la meilleure option, mais vous pouvez aussi consommer:
        - Du citronnade fraîche légère en sucre
        - Des infusions comme la menthe ou le thé à la verveine (louiza)
        - De l'eau aromatisée aux fruits
      • Évitez le thé très fort (thé tunisien traditionnel) qui peut être déshydratant.
      • Limitez les boissons très sucrées comme les sodas et les jus industriels.
      • Consommez des fruits et légumes à haute teneur en eau comme le concombre, la pastèque, le melon.
      • Pendant le Ramadan, consultez votre médecin avant de jeûner, car l'hydratation pendant le traitement est primordiale.
    `,
    imageUrl: "/images/advice/hydration-tunisia.jpg",
    priority: 5,
  },
  {
    id: "8",
    title: "Adapter l'alimentation traditionnelle tunisienne",
    content: `
      Voici comment adapter les plats tunisiens traditionnels pendant votre traitement:

      • Réduisez l'intensité des épices et des harissas dans les plats comme le couscous, les tajines et les chorba.
      • Optez pour les versions de plats plus douces comme le riz blanc au lieu du riz djerbien épicé.
      • Le slata mechouia peut être adaptée en grillant les légumes sans la peau et en réduisant le piment.
      • Préférez les méthodes de cuisson comme la vapeur, la cuisson à l'eau ou au four plutôt que la friture.
      • Les soupes comme la chorba peuvent être préparées avec moins de tomate et d'acidité.
      • Les boulettes de viande peuvent être préparées avec moins de graisse et d'épices.
      • Vous pouvez toujours apprécier les saveurs tunisiennes grâce à des herbes comme la menthe, le persil et la coriandre.
    `,
    imageUrl: "/images/advice/traditional-tunisian-food.jpg",
    priority: 4,
  },
  {
    id: "9",
    title: "Options de petit-déjeuner adaptées",
    content: `
      Le petit-déjeuner est un repas important pour maintenir vos forces pendant le traitement:

      • Essayez une version plus légère du traditionnel petit-déjeuner tunisien:
        - Pain complet avec un peu d'huile d'olive de Tunisie au lieu du beurre
        - Fromage blanc frais (jben) moins salé
        - Œufs préparés à la coque ou pochés plutôt que frits
      • Les bouillies comme l'assida ou la bsissa sont d'excellentes options car elles sont nourrissantes et faciles à digérer.
      • Les dattes fournissent une bonne énergie naturelle - consommez-en 2-3 le matin.
      • Un yaourt nature avec un peu de miel et quelques amandes concassées.
      • Du pain grillé avec une fine couche de confiture sans sucre ajouté.
      • Une tisane ou un thé très léger au lieu du thé traditionnel fort.
    `,
    forSymptoms: ["nausea_vomiting", "dry_mouth"],
    imageUrl: "/images/advice/tunisian-breakfast.jpg",
    priority: 3,
  },
  {
    id: "10",
    title: "Nutrition pendant les périodes de fêtes",
    content: `
      Les périodes de fêtes comme l'Aïd, le Ramadan ou les mariages peuvent être un défi nutritionnel pendant le traitement:

      • Ne vous sentez pas obligé de consommer les plats traditionnels riches ou épicés pour faire plaisir à votre famille.
      • Préparez à l'avance des versions plus légères des plats de fête que vous pourrez consommer.
      • Pendant l'Aïd, privilégiez les morceaux de viande maigres et bien cuits plutôt que gras.
      • Pour les pâtisseries traditionnelles, optez pour de petites portions ou des versions moins sucrées.
      • Hydratez-vous bien avant les repas de fête pour éviter la surconsommation.
      • Gardez un horaire de repas régulier même pendant les périodes de fêtes.
      • N'hésitez pas à expliquer poliment vos besoins nutritionnels à votre famille et amis.
    `,
    imageUrl: "/images/advice/festive-food-adaptation.jpg",
    priority: 3,
  },
  {
    id: "11",
    title: "Utiliser les herbes aromatiques tunisiennes à des fins médicinales",
    content: `
      La Tunisie est riche en herbes aromatiques qui peuvent aider pendant le traitement:

      • La menthe (naanaa) peut aider à soulager les nausées - en infusion ou fraîche dans les plats.
      • Le thym (zaatar) peut aider à la digestion - en infusion ou en petite quantité dans les soupes.
      • La verveine (louiza) apaise le système digestif - excellente en infusion avant le coucher.
      • Le romarin (iklil) peut stimuler l'appétit - utilisez-le pour aromatiser les plats neutres.
      • La fleur d'oranger (ma zahar) peut aider à calmer l'anxiété et favoriser le sommeil.
      • Le cumin (kamoun) facilite la digestion - utilisez-le en petite quantité dans les plats.
      • La cannelle (qarfa) peut aider à stabiliser la glycémie - saupoudrez-en dans les bouillies.

      Attention: consultez toujours votre médecin avant d'utiliser des herbes comme remède, certaines peuvent interagir avec votre traitement.
    `,
    forSymptoms: ["nausea_vomiting", "diarrhea", "constipation"],
    imageUrl: "/images/advice/tunisian-herbs.jpg",
    priority: 4,
  },
  {
    id: "12",
    title: "Alternatives aux produits laitiers",
    content: `
      Si vous avez des difficultés à digérer les produits laitiers pendant votre traitement:

      • Remplacez le lait de vache par:
        - Du lait d'amande facile à préparer à la maison
        - Du lait de riz disponible en Tunisie dans les supermarchés
      • Pour le calcium, consommez:
        - Des légumes à feuilles vertes comme les épinards ou les blettes
        - Des amandes et autres fruits secs
        - Des figues fraîches ou séchées (très communes en Tunisie)
      • Remplacez le yaourt par:
        - Du yaourt à base de lait végétal
        - Du lben (petit lait) qui est souvent mieux toléré que le yaourt classique
      • Pour les fromages, optez pour:
        - Des fromages frais moins riches comme le jben traditionnel
        - Des fromages à pâte dure affinés qui contiennent moins de lactose
    `,
    forSymptoms: ["diarrhea", "abdominal_pain"],
    imageUrl: "/images/advice/dairy-alternatives.jpg",
    priority: 3,
  },
];
