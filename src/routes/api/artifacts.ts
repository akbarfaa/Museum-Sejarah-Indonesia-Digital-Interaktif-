// @ts-ignore
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { parseCSV, transformArtifacts } from "@/lib/csv-parser";
// @ts-ignore
import csvContent from "../../../scraped_artifacts.csv?raw";
import { artifactsData } from "@/data/artifacts-data";

export const APIRoute = createAPIFileRoute("/api/artifacts")({
  GET: ({ request }: { request: Request }) => {
    try {
      const records = parseCSV(csvContent);
      const csvArtifacts = transformArtifacts(records);

      const csvMap = new Map(csvArtifacts.map((a) => [a.id, a]));
      const merged = artifactsData.map((sa) => {
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

      return new Response(JSON.stringify(merged), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    } catch (error: any) {
      return new Response(
        JSON.stringify({ error: "Failed to load artifacts", details: error.message }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
});
