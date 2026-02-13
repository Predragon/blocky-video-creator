export const COLORS = {
  skin: ['#FFCC99', '#F5D6BA', '#8D5524', '#C68642', '#E0AC69', '#F1C27D', '#FFE0BD', '#6B4423'],
  shirt: ['#FF0000', '#0066FF', '#00CC44', '#FF6600', '#9933FF', '#FF3399', '#00CCCC', '#FFD700', '#333333', '#FFFFFF'],
  pants: ['#1a3a5c', '#2d2d2d', '#5c4033', '#1a1a2e', '#8B8000', '#4a4a4a', '#000080', '#2F4F4F'],
  hair: ['#1a1a1a', '#4a2800', '#8B4513', '#DAA520', '#FF4500', '#FF69B4', '#800080', '#00CED1'],
  hat: ['none', '#FF0000', '#0066FF', '#333333', '#FFD700', '#FF69B4', '#00CC44', '#FF6600'],
};

export const SCENES = [
  { name: 'Beach', ground: '#F4D03F', sky: '#87CEEB', trees: false, buildings: false, water: true },
  { name: 'City', ground: '#555555', sky: '#87CEEB', trees: false, buildings: true, water: false },
  { name: 'Forest', ground: '#2d5a27', sky: '#87CEEB', trees: true, buildings: false, water: false },
  { name: 'Night City', ground: '#333333', sky: '#0a0a2e', trees: false, buildings: true, water: false },
  { name: 'Park', ground: '#4CAF50', sky: '#87CEEB', trees: true, buildings: false, water: false },
  { name: 'Sunset', ground: '#C2B280', sky: '#FF6B35', trees: true, buildings: false, water: true },
];

export const ANIMATIONS = ['idle', 'wave', 'dance', 'walk', 'jump', 'spin'];

export const ACCESSORIES = ['none', 'sunglasses', 'bow', 'crown', 'headband'];

export const DEFAULT_CHARACTERS = [
  {
    id: 1, x: -1.5, z: 0, skin: '#FFCC99', shirt: '#FF0000', pants: '#1a3a5c',
    hair: '#1a1a1a', hat: 'none', accessory: 'none', animation: 'idle', name: 'Player 1',
  },
  {
    id: 2, x: 1.5, z: 0, skin: '#8D5524', shirt: '#0066FF', pants: '#2d2d2d',
    hair: '#4a2800', hat: '#FF0000', accessory: 'none', animation: 'idle', name: 'Player 2',
  },
];
