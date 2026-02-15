export const COLORS = {
  skin: ['#FFCC99', '#F5D6BA', '#8D5524', '#C68642', '#E0AC69', '#F1C27D', '#FFE0BD', '#6B4423'],
  shirt: ['#FFFFFF', '#FF0000', '#0066FF', '#00CC44', '#FF6600', '#9933FF', '#FF3399', '#00CCCC', '#FFD700', '#333333', '#808080'],
  pants: ['#CC3333', '#1a3a5c', '#2d2d2d', '#5c4033', '#1a1a2e', '#8B8000', '#4a4a4a', '#000080', '#2F4F4F', '#ADD8E6'],
  hair: ['#1a1a1a', '#4a2800', '#8B4513', '#DAA520', '#FF4500', '#FF69B4', '#800080', '#00CED1', '#8B0000'],
  hat: ['none', '#FF0000', '#0066FF', '#333333', '#FFD700', '#FF69B4', '#00CC44', '#FF6600'],
};

export const HAIR_STYLES = ['default', 'bob', 'ponytail', 'bun', 'twin_buns', 'twin_tails'];

export const EYE_COLORS = ['#111111', '#E91E63', '#FF5722', '#2196F3', '#4CAF50', '#9C27B0', '#795548'];

export const EXPRESSIONS = ['neutral', 'happy', 'angry', 'sad', 'surprised'];

export const CLOTHING_TYPES = ['pants', 'skirt', 'uniform'];

export const SOCK_COLORS = ['none', '#FFFFFF', '#FFE0BD', '#000000'];

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
    id: 1, x: -1.8, z: 0, skin: '#FFCC99', shirt: '#FFFFFF', pants: '#CC3333',
    hair: '#DAA520', hat: 'none', accessory: 'none', animation: 'idle',
    name: 'Student 1', hairStyle: 'bob', eyeColor: '#E91E63', expression: 'angry',
    clothing: 'uniform', socks: '#FFFFFF',
  },
  {
    id: 2, x: -0.6, z: 0, skin: '#FFCC99', shirt: '#FFFFFF', pants: '#CC3333',
    hair: '#8B0000', hat: 'none', accessory: 'none', animation: 'idle',
    name: 'Student 2', hairStyle: 'twin_buns', eyeColor: '#E91E63', expression: 'surprised',
    clothing: 'uniform', socks: '#FFFFFF',
  },
  {
    id: 3, x: 1.2, z: 0, skin: '#FFCC99', shirt: '#808080', pants: '#ADD8E6',
    hair: '#8B0000', hat: 'none', accessory: 'none', animation: 'idle',
    name: 'Mom', hairStyle: 'bun', eyeColor: '#795548', expression: 'sad',
    clothing: 'pants', socks: 'none',
  },
];
