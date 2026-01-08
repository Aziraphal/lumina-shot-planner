export enum Gear {
  CANON_R50 = 'Canon EOS R50',
  HONOR_MAGIC_6 = 'Honor Magic 6 Pro',
  DJI_MINI_3 = 'DJI Mini 3'
}

export enum Category {
  TRAVEL = 'Voyage',
  VLOG = 'Vlog Quotidien',
  STREET = 'Street Photography',
  CINEMATIC = 'Cinématique',
  SOCIAL = 'Social Media / Reel',
  PHOTOGRAPHY = 'Photographie',
  VFX = 'Effets Spéciaux / VFX'
}

export interface ShotSetting {
  gear: Gear;
  focalLength: string;
  aperture: string;
  shutter: string;
  fps: string;
  iso: string;
  mode: string;
  composition?: string;
}

export interface Shot {
  id: string;
  title: string;
  description: string;
  settings: ShotSetting;
  icon: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  category: Category;
  duration: string;
  gearRequired: Gear[];
  shots: Shot[];
  coverImage: string;
}
