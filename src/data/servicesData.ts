import { ServiceTier } from '../types';

export const COMPANY_INFO = {
  name: 'WAM Auto',
  subtitle: 'Diagnostic Automobile Électronique à Domicile',
  phone: '+33 7 82 99 35 91',
  phoneFormatted: '07 82 99 35 91',
  email: 'wamauto59@gmail.com',
  region: 'Hauts-de-France (Nord 59)',
  freeZone: 'Métropole Européenne de Lille & agglomération lilloise',
  socials: {
    tiktok: {
      handle: 'wam.auto.59',
      url: 'https://www.tiktok.com/@wam.auto.59'
    },
    instagram: {
      handle: 'wam.auto59',
      url: 'https://www.instagram.com/wam.auto59/'
    },
    snapchat: {
      handle: 'wam.auto',
      url: 'https://www.snapchat.com/add/wam.auto'
    }
  },
  hours: {
    standard: '8h-12h / 14h-18h / 19h30-23h30',
    friday: '8h-12h uniquement',
    display: '8h-12h / 14h-18h / 19h30-23h30 (Vendredi : 8h-12h)'
  }
};

export const SERVICES_LIST: ServiceTier[] = [
  {
    id: 'express',
    name: 'Diagnostic Express',
    tagline: 'Identification rapide d’une panne ou d’un voyant allumé',
    price: 35,
    duration: '20 à 30 min',
    popular: false,
    targetAudience: 'Pour tout conducteur confronté à un voyant orange/rouge soudain ou avant le contrôle technique.',
    description: 'Une intervention rapide et ciblée pour lire immédiatement les codes défauts enregistrés, comprendre l’origine précise de l’alerte et réinitialiser les voyants après intervention.',
    features: [
      'Branchement valise professionnelle haute précision OBD2',
      'Lecture des calculateurs principaux (Moteur, Injection, Dépollution)',
      'Décodage clair des codes défauts (DTC) sans jargon incompréhensible',
      'Effacement des défauts fugitifs et réinitialisation du voyant',
      'Conseil direct et orientation sur la réparation à prévoir'
    ],
    pointsOfControl: [
      'Calculateur moteur principal',
      'Système injection & allumage',
      'Sondes lambda & catalyseur',
      'Voyants tableau de bord (Check Engine)'
    ]
  },
  {
    id: 'complet',
    name: 'Diagnostic Complet',
    tagline: 'Analyse approfondie de l’ensemble des systèmes électroniques',
    price: 50,
    duration: '45 à 60 min',
    popular: true,
    targetAudience: 'Recommandé pour pannes aléatoires, pertes de puissance, soucis ABS/ESP, boîte auto ou dysfonctionnements multiples.',
    description: 'Un scan intégral de l’ensemble des calculateurs du véhicule, couplé à l’analyse en temps réel des valeurs dynamiques et des flux de données des capteurs.',
    features: [
      'Scan intégral à 100% de tous les calculateurs embarqués',
      'Moteur, boîte de vitesses, ABS/ESP, direction assistée, airbags',
      'Analyse spécifique système FAP / DPF, vanne EGR et injection AdBlue',
      'Systèmes de confort, climatisation, fermetures et réseaux multiplexés (CAN)',
      'Lecture des données dynamiques en temps réel (pressions, débits, températures)',
      'Pour hybrides & électriques : vérification état de santé batterie et circuits auxiliaires',
      'Rapport complet détaillé remis et commenté sur place'
    ],
    pointsOfControl: [
      'Calculateur injection & allumage',
      'Système antipollution (FAP, EGR, AdBlue)',
      'Boîte automatique & transmission',
      'Système de freinage & sécurité (ABS, ESP, ASR)',
      'Modules Airbags & prétensionneurs',
      'Réseau CAN-Bus & passerelle de bord (Gateway)',
      'Climatisation & régulation thermique',
      'Circuit de charge & alternateur / batterie'
    ]
  },
  {
    id: 'premium',
    name: 'Diagnostic Premium / Pré-achat',
    tagline: 'Check-up complet et vérification de tous les points de contrôle',
    price: 80,
    duration: '1h15 à 1h30',
    popular: false,
    targetAudience: 'Indispensable pour sécuriser l’achat d’une voiture d’occasion ou valoriser une vente entre particuliers.',
    description: 'L’expertise totale avant transaction : scan complet de tous les calculateurs, analyse de l’historique des pannes récemment effacées, contrôle de cohérence kilométrique et vérification physique de tous les points de contrôle clés.',
    features: [
      'Scan électronique complet de tous les calculateurs embarqués',
      'Détection des codes défauts masqués ou effacés avant la vente',
      'Contrôle de cohérence du kilométrage dans les différents modules (ABS, ECU, combiné)',
      'Vérification de l’état de santé de la batterie haute-tension (EV / Hybrides) & batterie 12V',
      'Inspection visuelle compartiment moteur (fuites, courroies, durites, niveaux fluides)',
      'Contrôle des trains roulants, pneumatiques, disques et plaquettes de frein',
      'Essai fonctionnel des équipements de confort et de sécurité',
      'Compte-rendu d’expertise impartial pour négocier ou acheter en toute sérénité'
    ],
    pointsOfControl: [
      'Tous les calculateurs électroniques (Scan 100%)',
      'Vérification historique & cohérence kilométrique',
      'État d’usure des pneumatiques & disques/plaquettes',
      'Circuit de refroidissement & étanchéité moteur',
      'Batterie de servitude & batterie de traction (Hybride/VE)',
      'Système de climatisation & chauffage auxiliaire',
      'Équipements électroniques (vitres, feux, serrures, multimédia)',
      'Bilan d’évaluation global pour négociation du prix d’achat'
    ]
  }
];

export const ADVANTAGES = [
  {
    title: 'Intervention à Domicile ou au Travail',
    desc: 'Fini les attentes en garage et les frais de remorquage. Le technicien vient directement avec tout le matériel pro à l’adresse de votre choix.',
    highlight: 'Zéro perte de temps'
  },
  {
    title: 'Thermiques, Hybrides & 100% Électriques',
    desc: 'Une double compétence rare : parfaite maîtrise des motorisations thermiques modernes (Essence, Diesel) et des technologies Hybrides/VE.',
    highlight: 'Multi-motorisations'
  },
  {
    title: 'Matériel Diagnostic de Pointe',
    desc: 'Valises électroniques professionnelles multimarques dernière génération pour dialoguer précisément avec les constructeurs européens, asiatiques et américains.',
    highlight: 'Technologie pro'
  },
  {
    title: 'Tarifs Fixes & Transparents',
    desc: 'Pas de surprise : 35€, 50€ ou 80€. En tant que spécialiste indépendant, aucun intérêt à inventer des pièces imaginaires à changer.',
    highlight: 'Impartialité totale'
  }
];

export const COVERAGE_ZONES = [
  {
    name: 'Métropole Européenne de Lille',
    badge: 'Déplacement OFFERT',
    rate: '0,00 € (Inclus)',
    cities: 'Lille, Roubaix, Tourcoing, Villeneuve d’Ascq, Marcq-en-Barœul, Ronchin, Lambersart, Wattrelos, Croix, Wasquehal, Seclin, Haubourdin...',
    isFree: true
  },
  {
    name: 'Bassin Minier & Flandres',
    badge: '0,70 € / km',
    rate: '0,70 € par kilomètre (au-delà de la MEL)',
    cities: 'Lens, Hénin-Beaumont, Douai, Armentières, Hazebrouck, Béthune, Bruay-la-Buissière...',
    isFree: false
  },
  {
    name: 'Reste des Hauts-de-France',
    badge: '0,70 € / km',
    rate: '0,70 € par kilomètre (au-delà de la MEL)',
    cities: 'Valenciennes, Cambrai, Arras, Dunkerque, Saint-Omer, Maubeuge et communes environnantes.',
    isFree: false
  }
];

export const TESTIMONIALS = [
  {
    author: 'Julien M.',
    city: 'Lille (59000)',
    vehicle: 'Peugeot 3008 BlueHDi',
    service: 'Diagnostic Complet (50€)',
    date: 'Septembre 2026',
    comment: 'Voyant moteur allumé avec mode dégradé. Le concessionnaire m’annonçait 120€ rien que pour poser la valise dans 2 semaines ! WAM Auto est venu le lendemain matin chez moi : injecteur n°3 encrassé et capteur de pression en cause. Explications claires et honnêtes. Je recommande les yeux fermés.'
  },
  {
    author: 'Karim B.',
    city: 'Roubaix (59100)',
    vehicle: 'Toyota Yaris Hybride',
    service: 'Diagnostic Premium / Pré-achat (80€)',
    date: 'Août 2026',
    comment: 'J’achetais une Yaris hybride d’occasion à un particulier. WAM Auto a inspecté la voiture de fond en comble et a détecté un code défaut de batterie hybride récemment effacé ainsi que des plaquettes hors d’usage. Ça m’a évité un gouffre financier de 2000€. Les 80€ les mieux rentabilisés de ma vie !'
  },
  {
    author: 'Sophie D.',
    city: 'Villeneuve d’Ascq (59650)',
    vehicle: 'Renault Zoé Électrique',
    service: 'Diagnostic Express (35€)',
    date: 'Septembre 2026',
    comment: 'Message "Panne système électrique" inquiétant sur ma Zoé. Intervention rapide sur mon lieu de travail entre midi et deux. C’était juste un contacteur d’ouverture de trappe de recharge défaillant. Rassurant, professionnel et très sympathique.'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'Comment se passe l’intervention à mon domicile ?',
    a: 'Le technicien WAM Auto arrive à l’heure convenue avec sa station de diagnostic mobile. Il branche la valise sur la prise OBD de votre véhicule (située généralement sous le volant ou dans la boîte à gants). Vous assistez à toute la manipulation sur l’écran de diagnostic et nous analysons ensemble chaque système.'
  },
  {
    q: 'Prenez-vous en charge les véhicules électriques et hybrides ?',
    a: 'Oui, absolument ! Contrairement à beaucoup de garages traditionnels qui refusent ou ne sont pas équipés pour ces technologies, WAM Auto dispose d’outils spécialisés capables de communiquer avec les contrôleurs haute tension, le système de régénération et les calculateurs de gestion batterie.'
  },
  {
    q: 'Le déplacement est-il vraiment gratuit à Lille et alentours ?',
    a: 'Oui, le déplacement est 100% OFFERT dans toute la Métropole Lilloise (Lille, Roubaix, Tourcoing, Villeneuve d’Ascq et toutes les communes de la MEL). Au-delà de la métropole lilloise, les frais kilométriques sont de 0,70 € par kilomètre parcouru (décompté à partir de la frontière de la MEL).'
  },
  {
    q: 'Pouvez-vous effacer les voyants allumés ?',
    a: 'Oui, nous pouvons effacer les codes défauts et éteindre les voyants (voyant moteur, airbag, entretien, révision, etc.). Cependant, si le défaut est matériellement toujours présent (par exemple un capteur réellement cassé), le calculateur le redétectera dès la remise en route. Nous vous expliquons toujours la cause réelle.'
  },
  {
    q: 'Puis-je vous faire intervenir sur un parking ou lieu de travail ?',
    a: 'Tout à fait. Tant que le véhicule est accessible et stationné en sécurité (parking public ou privé, cour, allée, place de stationnement), l’intervention peut se dérouler sans aucun problème.'
  }
];
