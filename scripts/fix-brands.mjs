import fs from 'fs';

const PRODUCTS_TS = 'src/data/products.ts';
let content = fs.readFileSync(PRODUCTS_TS, 'utf8');

const brandMap = [
  { key: 'Now food', name: 'Now Foods' },
  { key: 'Now Foods', name: 'Now Foods' },
  { key: 'Ostrovit', name: 'Ostrovit' },
  { key: 'Dorian Yates', name: 'Dorian Yates' },
  { key: 'Lazar Angelov', name: 'Lazar Angelov' },
  { key: 'Angelov Nutrition', name: 'Lazar Angelov' },
  { key: 'HX Nutrition', name: 'HX Nutrition' },
  { key: '7nutrition', name: '7Nutrition' },
  { key: 'Biotech', name: 'Biotech USA' },
  { key: 'Universal', name: 'Universal Nutrition' },
  { key: 'Reflex', name: 'Reflex' },
  { key: 'Grassberg', name: 'Grassberg' },
  { key: 'Vhealth', name: 'VHealth' },
  { key: 'MuscleTech', name: 'MuscleTech' },
  { key: 'Dymatize', name: 'Dymatize' },
  { key: 'Applied Nutrition', name: 'Applied Nutrition' },
  { key: 'Optimum Nutrition', name: 'Optimum Nutrition' },
  { key: 'Scitec', name: 'Scitec Nutrition' },
  { key: 'Nutrend', name: 'Nutrend' },
  { key: 'Cellucor', name: 'Cellucor' },
  { key: 'Mutant', name: 'Mutant' },
  { key: 'Rule 1', name: 'Rule 1' },
  { key: 'JNX Sports', name: 'JNX Sports' },
  { key: 'Cobra Labs', name: 'JNX Sports' },
  { key: 'BioTechUSA', name: 'Biotech USA' }
];

// Regex to find product blocks and update brands
const updatedContent = content.replace(/name: "(.*?)",\s+slug: "(.*?)",\s+brand: "(.*?)",/g, (match, name, slug, brand) => {
  let detectedBrand = brand;
  
  if (brand === 'Monaliza House' || brand === 'supplements') {
    for (const b of brandMap) {
      if (name.toLowerCase().includes(b.key.toLowerCase())) {
        detectedBrand = b.name;
        break;
      }
    }
  }
  
  return `name: "${name}",
    slug: "${slug}",
    brand: "${detectedBrand}",`;
});

fs.writeFileSync(PRODUCTS_TS, updatedContent);
console.log('Brands updated in src/data/products.ts');
