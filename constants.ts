
import { Program, Category, Gear } from './types';

export const PROGRAMS: Program[] = [
  {
    id: 'master-travel-cinematic',
    title: 'L\'Éveil du Voyage (Cinématique Pro)',
    description: 'Une structure narrative complète mêlant paysages grandioses au drone et détails intimes au R50. Conçu pour un rendu "Film Look".',
    category: Category.CINEMATIC,
    duration: '3h',
    gearRequired: [Gear.CANON_R50, Gear.DJI_MINI_3, Gear.HONOR_MAGIC_6],
    coverImage: 'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?auto=format&fit=crop&q=80&w=1200',
    shots: [
      {
        id: 'mtc-1',
        title: 'L\'Établissement (Drone)',
        description: 'Survol lent d\'un point d\'intérêt. Mouvement de caméra "Tilt up" progressif.',
        icon: '🛸',
        settings: {
          gear: Gear.DJI_MINI_3,
          focalLength: '24mm',
          aperture: 'f/1.7',
          shutter: '1/50s (avec ND16)',
          fps: '24fps',
          iso: 'ISO 100',
          mode: 'Ciné Mode / D-Cinelike',
          composition: 'Règle des tiers sur l\'horizon'
        }
      },
      {
        id: 'mtc-2',
        title: 'Texture & Détail (Macro)',
        description: 'Plan de transition sur un élément local (fleur, tissu, pierre).',
        icon: '🌿',
        settings: {
          gear: Gear.HONOR_MAGIC_6,
          focalLength: '1x (23mm)',
          aperture: 'f/1.4',
          shutter: '1/100s',
          fps: '60fps (pour ralenti)',
          iso: 'ISO 50',
          mode: 'Mode Pro / HDR Vivid',
          composition: 'Profondeur de champ ultra-faible'
        }
      },
      {
        id: 'mtc-3',
        title: 'Le Sujet en Action (R50)',
        description: 'Portrait en mouvement. Suivi AF sur l\'œil indispensable.',
        icon: '📸',
        settings: {
          gear: Gear.CANON_R50,
          focalLength: '45mm',
          aperture: 'f/6.3',
          shutter: '1/50s',
          fps: '23.98fps',
          iso: 'ISO 200',
          mode: 'Manuel (Picture Style: Neutral)',
          composition: 'Espace devant le regard'
        }
      }
    ]
  },
  {
    id: 'night-urban-vlog',
    title: 'Vibe Nocturne & Low-Light',
    description: 'Exploitez la grande ouverture f/1.4 du Magic 6 Pro et la montée en ISO du R50 pour capturer l\'ambiance de la ville après minuit.',
    category: Category.VLOG,
    duration: '1h 30min',
    gearRequired: [Gear.CANON_R50, Gear.HONOR_MAGIC_6],
    coverImage: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&q=80&w=1200',
    shots: [
      {
        id: 'nuv-1',
        title: 'Intro Face Camera',
        description: 'Utilisez le Honor pour sa stabilisation IA et sa gestion des hautes lumières (néons).',
        icon: '📱',
        settings: {
          gear: Gear.HONOR_MAGIC_6,
          focalLength: '0.6x (Grand Angle)',
          aperture: 'f/2.0',
          shutter: 'Auto (EIS activé)',
          fps: '30fps',
          iso: 'Auto (max 1600)',
          mode: 'Mode Vidéo Nuit',
          composition: 'Centré avec arrière-plan lumineux'
        }
      },
      {
        id: 'nuv-2',
        title: 'B-Roll Flous Artistiques',
        description: 'Mise au point manuelle sur le R50 pour créer des ronds de bokeh avec les lumières de la ville.',
        icon: '✨',
        settings: {
          gear: Gear.CANON_R50,
          focalLength: '45mm',
          aperture: 'f/6.3',
          shutter: '1/50s',
          fps: '24fps',
          iso: 'ISO 1600',
          mode: 'MF (Manual Focus)',
          composition: 'Abstraction de formes'
        }
      }
    ]
  },
  {
    id: 'pro-portrait-series',
    title: 'Série Portrait "Magazine"',
    description: 'Utilisez le téléobjectif périscope du Honor et la colorimétrie Canon pour une série photo haut de gamme.',
    category: Category.PHOTOGRAPHY,
    duration: '45 min',
    gearRequired: [Gear.CANON_R50, Gear.HONOR_MAGIC_6],
    coverImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200',
    shots: [
      {
        id: 'pps-1',
        title: 'Portrait de Caractère (Canon)',
        description: 'Capture RAW pour une post-production poussée.',
        icon: '📷',
        settings: {
          gear: Gear.CANON_R50,
          focalLength: '45mm',
          aperture: 'f/6.3',
          shutter: '1/250s',
          fps: 'N/A',
          iso: 'ISO 100',
          mode: 'Priorité Ouverture / RAW',
          composition: 'Gros plan serré'
        }
      },
      {
        id: 'pps-2',
        title: 'Mode Portrait 2.5x (Honor)',
        description: 'Utilisez la compression optique du périscope 180MP.',
        icon: '🤳',
        settings: {
          gear: Gear.HONOR_MAGIC_6,
          focalLength: '68mm (équiv.)',
          aperture: 'f/2.6',
          shutter: 'Auto',
          fps: 'N/A',
          iso: 'ISO 50',
          mode: 'Portrait (Flou d\'arrière-plan)',
          composition: 'Plan poitrine'
        }
      }
    ]
  }
];
