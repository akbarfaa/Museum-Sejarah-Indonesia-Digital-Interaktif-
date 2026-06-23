import type { Artifact, RoomId } from "@/data/artifacts";
import type { CinemaEra } from "@/data/cinema";

/**
 * Standard RFC 4180 compliant CSV parser.
 * Handles commas, double-quotes, newlines inside fields, and escaped quotes ("").
 */
export function parseCSV(content: string): Record<string, string>[] {
  const records: string[][] = [];
  let currentRecord: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped double quote
        currentField += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',') {
      if (inQuotes) {
        currentField += char;
      } else {
        currentRecord.push(currentField);
        currentField = "";
      }
    } else if (char === '\n' || char === '\r') {
      if (inQuotes) {
        currentField += char;
      } else {
        if (char === '\r' && nextChar === '\n') {
          i++; // skip \n
        }
        currentRecord.push(currentField);
        currentField = "";

        if (currentRecord.length > 0 && currentRecord.some((field) => field.trim() !== "")) {
          records.push(currentRecord);
        }
        currentRecord = [];
      }
    } else {
      currentField += char;
    }
  }

  if (currentField || currentRecord.length > 0) {
    currentRecord.push(currentField);
    if (currentRecord.some((field) => field.trim() !== "")) {
      records.push(currentRecord);
    }
  }

  if (records.length === 0) return [];

  const headers = records[0];
  const finalRecords: Record<string, string>[] = [];

  for (let i = 1; i < records.length; i++) {
    const row = records[i];
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = row[index] ?? "";
    });
    finalRecords.push(record);
  }

  return finalRecords;
}

const sectionMapping: Record<string, string> = {
  // Ancient
  "homo-erectus": "ancient-fossils",
  "meganthropus": "ancient-fossils",
  "homo-soloensis": "ancient-fossils",
  "stone-axe": "ancient-tools",
  "megalith": "ancient-megalith",
  "sangiran-site": "ancient-fossils",
  "nias-megalith": "ancient-megalith",
  // Kingdom
  "keris": "kingdom-majapahit",
  "ganesha": "kingdom-classical",
  "inscription": "kingdom-sriwijaya",
  "crown": "kingdom-islamic",
  "borobudur": "kingdom-classical",
  "prambanan": "kingdom-classical",
  // Colonial
  "voc-map": "colonial-voc",
  "diponegoro-kris": "colonial-resistance",
  "old-photo": "colonial-voc",
  "hasanuddin-helmet": "colonial-resistance",
  "banda-spices": "colonial-arrival",
  // Modern
  "proklamasi": "modern-revolution",
  "merah-putih": "modern-revolution",
  "soekarno-speech": "modern-oldorder",
  "surabaya-spear": "modern-revolution",
  "bung-tomo-radio": "modern-revolution",
  "monas": "modern-symbols",
  "satellite": "modern-neworder",
  "garuda": "modern-symbols",
  // Heritage
  "batik": "heritage-intangible",
  "angklung": "heritage-intangible",
  "wayang": "heritage-intangible",
};

const defaultRoomSection: Record<string, string> = {
  ancient: "ancient-fossils",
  kingdom: "kingdom-classical",
  colonial: "colonial-voc",
  national: "national-struggle",
  modern: "modern-revolution",
  heritage: "heritage-intangible",
};

/**
 * Transforms generic CSV records into fully-typed Artifact objects.
 */
export function transformArtifacts(records: Record<string, string>[]): Artifact[] {
  return records.map((r) => {
    // Parse position: format from CSV is position_x, position_z
    const posX = parseFloat(r.position_x || "0");
    const posZ = parseFloat(r.position_z || "0");

    return {
      id: r.id,
      room: r.room as RoomId,
      section: sectionMapping[r.id] || defaultRoomSection[r.room] || "ancient-fossils",
      name: {
        en: r.name_en || "",
        id: r.name_id || "",
      },
      era: {
        en: r.era_en || "",
        id: r.era_id || "",
      },
      origin: {
        en: r.origin_en || "",
        id: r.origin_id || "",
      },
      description: {
        en: r.description_en || "",
        id: r.description_id || "",
      },
      color: r.color || "#ffffff",
      shape: (r.shape || "texture") as Artifact["shape"],
      position: [posX, posZ],
    };
  });
}

/**
 * Transforms generic CSV records into fully-typed CinemaEra objects.
 */
export function transformCinema(records: Record<string, string>[]): CinemaEra[] {
  return records.map((r) => {
    const titleEn = r.title_en || "";
    const titleId = r.title_id || "";

    return {
      id: r.id,
      youtubeId: r.youtubeId || "",
      category: r.category || "",
      era: {
        en: r.era_en || "",
        id: r.era_id || "",
      },
      title: {
        en: titleEn,
        id: titleId,
      },
      year: {
        en: r.year_en || "",
        id: r.year_id || "",
      },
      synopsis: {
        en: r.synopsis_en || "",
        id: r.synopsis_id || "",
      },
      narration: {
        en: `Watch this video: ${titleEn}`,
        id: `Tonton video ini: ${titleId}`,
      },
    };
  });
}
