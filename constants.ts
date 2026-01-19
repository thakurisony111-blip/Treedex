
import { Species } from './types';

export const COLORS = {
  bg: '#050607',
  primary: '#6BFF9E',
  cyan: '#00FFFF',
  magenta: '#FF00FF',
  panel: 'rgba(5, 6, 7, 0.9)',
};

export const MOCK_SPECIES: Species[] = [
  {
    commonName: "European Silver Fir",
    scientificName: "Abies alba",
    // Fix: Added required genus property
    genus: "Abies",
    confidence: 0.93,
    family: "Pinaceae",
    origin: "Central/Southern Europe",
    isNative: true,
    isInvasive: false,
    heightMeters: 50,
    lifespanYears: 400,
    moisturePreference: "High",
    summary: "A majestic conifer with silver-streaked needles and cylindrical cones that point upwards.",
    care: "Requires cool summers and consistent moisture; sensitive to air pollution.",
    uses: ["Essential oils", "Musical instruments", "Traditional medicine"],
    wildlife: ["Capercaillie", "Long-eared owls", "Aphids"],
    symbolism: "Represents strength and immortality in Germanic folklore.",
    funFact: "The wood is highly valued for its resonant properties and is used to make violin soundboards."
  },
  {
    commonName: "Coast Redwood",
    scientificName: "Sequoia sempervirens",
    // Fix: Added required genus property
    genus: "Sequoia",
    confidence: 0.98,
    family: "Cupressaceae",
    origin: "California Coast",
    isNative: true,
    isInvasive: false,
    heightMeters: 115,
    lifespanYears: 2000,
    moisturePreference: "High",
    summary: "The tallest living organisms on Earth, these giants create unique 'fog-belt' ecosystems.",
    care: "Dependent on coastal fog for moisture during dry summers.",
    uses: ["Landscape architecture", "Restoration projects"],
    wildlife: ["Marbled murrelets", "Northern spotted owls", "Banana slugs"],
    symbolism: "A symbol of endurance and prehistoric wisdom.",
    funFact: "Redwoods can grow their own tiny ecosystems in their massive upper canopies, 300 feet in the air."
  },
  {
    commonName: "Japanese Maple",
    scientificName: "Acer palmatum",
    // Fix: Added required genus property
    genus: "Acer",
    confidence: 0.89,
    family: "Sapindaceae",
    origin: "Japan, Korea, China",
    isNative: false,
    isInvasive: false,
    heightMeters: 10,
    lifespanYears: 100,
    moisturePreference: "Moderate",
    summary: "Renowned for its elegant, deeply lobed leaves and spectacular autumn foliage.",
    care: "Prefers dappled shade and protection from late frosts.",
    uses: ["Bonsai art", "Ornamental gardens"],
    wildlife: ["Moths", "Birds", "Pollinating insects"],
    symbolism: "In Japan, it represents peace, serenity, and the arrival of autumn.",
    funFact: "There are over 1,000 different cultivars of Japanese Maple, each with unique leaf shapes and colors."
  },
  {
    commonName: "Quaking Aspen",
    scientificName: "Populus tremuloides",
    // Fix: Added required genus property
    genus: "Populus",
    confidence: 0.95,
    family: "Salicaceae",
    origin: "North America",
    isNative: true,
    isInvasive: false,
    heightMeters: 25,
    lifespanYears: 150,
    moisturePreference: "Moderate",
    summary: "Famous for its smooth white bark and leaves that 'quake' in the wind due to flattened petioles.",
    care: "Fast-growing; thrives in disturbed soil and full sun.",
    uses: ["Paper pulp", "Animal fodder", "Matches"],
    wildlife: ["Elk", "Beavers", "Ruffed grouse"],
    symbolism: "Represents community and interconnectedness through its root systems.",
    funFact: "A single aspen grove is often a single biological organism connected by a massive underground root system."
  },
  {
    commonName: "Baobab",
    scientificName: "Adansonia digitata",
    // Fix: Added required genus property
    genus: "Adansonia",
    confidence: 0.91,
    family: "Malvaceae",
    origin: "African Savanna",
    isNative: false,
    isInvasive: false,
    heightMeters: 20,
    lifespanYears: 2500,
    moisturePreference: "Low",
    summary: "The 'Upside-down Tree' stores massive amounts of water in its swollen trunk to survive extreme drought.",
    care: "Requires warm temperatures and exceptionally well-drained soil.",
    uses: ["Fruit (Vitamin C)", "Rope fiber", "Shelter"],
    wildlife: ["Fruit bats", "Elephants", "Bushbabies"],
    symbolism: "Known as the 'Tree of Life', it is a sacred gathering place for many cultures.",
    funFact: "Baobab trunks can be so large that people have occasionally lived inside hollowed-out older specimens."
  },
  {
    commonName: "English Oak",
    scientificName: "Quercus robur",
    // Fix: Added required genus property
    genus: "Quercus",
    confidence: 0.94,
    family: "Fagaceae",
    origin: "Europe, Western Asia",
    isNative: true,
    isInvasive: false,
    heightMeters: 40,
    lifespanYears: 1000,
    moisturePreference: "Moderate",
    summary: "The definitive oak, providing critical habitat for more species than any other native tree in Europe.",
    care: "Requires space to spread its broad canopy; tolerant of various soil types.",
    uses: ["Shipbuilding", "Furniture", "Acorn flour"],
    wildlife: ["Jay birds", "Stag beetles", "Squirrels"],
    symbolism: "A symbol of strength, endurance, and ancient sovereignty.",
    funFact: "A single mature oak tree can support an ecosystem of over 2,300 different species of life."
  }
];
