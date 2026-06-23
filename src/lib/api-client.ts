import { parseCSV, transformArtifacts, transformCinema } from "./csv-parser";
// @ts-ignore
import artifactsCsv from "../../scraped_artifacts.csv?raw";
// @ts-ignore
import cinemaCsv from "../../scraped_cinema.csv?raw";
import type { Artifact } from "@/data/artifacts";
import type { CinemaEra } from "@/data/cinema";

/**
 * Fetches artifacts list from the public API endpoint.
 * Falls back to parsing root CSV if server fetch fails during SSR/build-time.
 */
export async function fetchArtifacts(): Promise<Artifact[]> {
  try {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    if (!baseUrl) {
      // Server-side fallback directly to prevent network hoop jumps
      return transformArtifacts(parseCSV(artifactsCsv));
    }
    const res = await fetch(`${baseUrl}/api/artifacts`);
    if (!res.ok) throw new Error(`API returned status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("fetchArtifacts client fetch failed, parsing CSV directly:", err);
    return transformArtifacts(parseCSV(artifactsCsv));
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
