export default function lightenColor(colorCode: string) {

  const FACTOR = 0.2;
  
  // Convert color code into RGB
  const hex = colorCode.replace(/^#/, '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Adjust color
  const newR = Math.round(r + (255 - r) * FACTOR);
  const newG = Math.round(g + (255 - g) * FACTOR);
  const newB = Math.round(b + (255 - b) * FACTOR);

  // Convert into color code
  const newColor = ((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0');
  return `#${newColor}`;
}