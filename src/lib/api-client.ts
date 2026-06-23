import { parseCSV, transformArtifacts, transformCinema } from "./csv-parser";
// @ts-ignore
import artifactsCsv from "../../scraped_artifacts.csv?raw";
// @ts-ignore
import cinemaCsv from "../../scraped_cinema.csv?raw";
import type { Artifact } from "@/data/artifacts";
import type { CinemaEra } from "@/data/cinema";
import { artifactsData } from "@/data/artifacts-data";

function getMergedArtifacts(): Artifact[] {
  const csvArtifacts = transformArtifacts(parseCSV(artifactsCsv));
  const csvMap = new Map(csvArtifacts.map((a) => [a.id, a]));
  return artifactsData.map((sa) => {
    const csvItem = csvMap.get(sa.id);
    if (!csvItem) return sa;
    return {
      ...sa,
      name: {
        en: csvItem.name.en || sa.name.en,
        id: csvItem.name.id || sa.name.id,
      },
      origin: {
        en: csvItem.origin.en || sa.origin.en,
        id: csvItem.origin.id || sa.origin.id,
      },
      era: {
        en: csvItem.era.en || sa.era.en,
        id: csvItem.era.id || sa.era.id,
      },
      description: {
        en: csvItem.description.en || sa.description.en,
        id: csvItem.description.id || sa.description.id,
      },
      color: csvItem.color || sa.color,
      shape: csvItem.shape || sa.shape,
    };
  });
}

/**
 * Fetches artifacts list from the public API endpoint.
 * Falls back to parsing root CSV if server fetch fails during SSR/build-time.
 */
export async function fetchArtifacts(): Promise<Artifact[]> {
  try {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    if (!baseUrl) {
      // Server-side fallback directly to prevent network hoop jumps
      return getMergedArtifacts();
    }
    const res = await fetch(`${baseUrl}/api/artifacts`);
    if (!res.ok) throw new Error(`API returned status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("fetchArtifacts client fetch failed, parsing CSV directly:", err);
    return getMergedArtifacts();
  }
}

/**
 * Fetches cinema videos collection from the public API endpoint.
 * Falls back to parsing root CSV if server fetch fails during SSR/build-time.
 */
export async function fetchCinema(): Promise<CinemaEra[]> {
  try {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    if (!baseUrl) {
      // Server-side fallback directly to prevent network hoop jumps
      return transformCinema(parseCSV(cinemaCsv));
    }
    const res = await fetch(`${baseUrl}/api/cinema`);
    if (!res.ok) throw new Error(`API returned status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("fetchCinema client fetch failed, parsing CSV directly:", err);
    return transformCinema(parseCSV(cinemaCsv));
  }
}
