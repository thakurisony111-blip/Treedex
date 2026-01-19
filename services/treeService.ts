
import { GoogleGenAI, Type } from "@google/genai";
import { Species, CollectionEntry, MoodLog, Mood } from '../types';

/**
 * Real tree identification using Gemini Vision API.
 * This provides a high-fidelity botanical identification and 
 * retrieves all required metadata in a single structured response.
 */
export const identifyTree = async (imageFile: File): Promise<Species> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });

  const prompt = `Act as a master botanist and identify the tree in this image. 
  1. Determine the exact species and genus.
  2. If the image is not a tree or is too poor quality to identify, return an empty object or a low confidence score.
  3. Provide a complete botanical profile including family, genus, origin, and stats.
  4. Include interesting facts like cultural symbolism, wildlife interactions, and human uses.
  5. The output must be valid JSON matching the requested schema.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: imageFile.type,
                data: base64Data,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            commonName: { type: Type.STRING },
            scientificName: { type: Type.STRING },
            genus: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            family: { type: Type.STRING },
            origin: { type: Type.STRING },
            isNative: { type: Type.BOOLEAN },
            isInvasive: { type: Type.BOOLEAN },
            heightMeters: { type: Type.NUMBER },
            lifespanYears: { type: Type.NUMBER },
            moisturePreference: { type: Type.STRING },
            summary: { type: Type.STRING },
            care: { type: Type.STRING },
            uses: { type: Type.ARRAY, items: { type: Type.STRING } },
            wildlife: { type: Type.ARRAY, items: { type: Type.STRING } },
            symbolism: { type: Type.STRING },
            funFact: { type: Type.STRING },
          },
          required: [
            "commonName", "scientificName", "genus", "confidence", "family", "origin", 
            "isNative", "isInvasive", "heightMeters", "lifespanYears", 
            "moisturePreference", "summary", "care", "uses", "wildlife", 
            "symbolism", "funFact"
          ],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No data received from analysis hub.");
    
    const result = JSON.parse(text);
    
    if (!result.scientificName || result.confidence < 0.1) {
      throw new Error("Target is not recognized as a valid botanical entity.");
    }

    return result as Species;
  } catch (error) {
    console.error("Botanical Analysis Failure:", error);
    throw new Error(error instanceof Error ? error.message : "The scanning sequence was interrupted by an unknown anomaly.");
  }
};

export const getCollection = (): CollectionEntry[] => {
  const stored = localStorage.getItem('treedex_collection');
  return stored ? JSON.parse(stored) : [];
};

export const saveToCollection = (species: Species, uploadedImageUrl: string | null): CollectionEntry[] => {
  const collection = getCollection();
  const id = btoa(species.scientificName);
  const existingIdx = collection.findIndex(item => item.id === id);
  
  const now = Date.now();
  
  if (existingIdx > -1) {
    const existing = collection[existingIdx];
    collection[existingIdx] = {
      ...existing,
      ...species,
      lastSeenDate: now,
      scanCount: existing.scanCount + 1,
      imageUrl: uploadedImageUrl || existing.imageUrl
    };
  } else {
    collection.push({
      ...species,
      id,
      firstSeenDate: now,
      lastSeenDate: now,
      scanCount: 1,
      imageUrl: uploadedImageUrl
    });
  }
  
  localStorage.setItem('treedex_collection', JSON.stringify(collection));
  return collection;
};

export const getMoodLogs = (): MoodLog[] => {
  const stored = localStorage.getItem('treedex_moods');
  return stored ? JSON.parse(stored) : [];
};

export const logMood = (speciesId: string, mood: Mood): MoodLog[] => {
  const moods = getMoodLogs();
  moods.push({
    speciesId,
    timestamp: Date.now(),
    mood
  });
  localStorage.setItem('treedex_moods', JSON.stringify(moods));
  return moods;
};
