// @ts-ignore
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { parseCSV, transformArtifacts } from "@/lib/csv-parser";
// @ts-ignore
import csvContent from "../../../scraped_artifacts.csv?raw";

export const APIRoute = createAPIFileRoute("/api/artifacts")({
  GET: ({ request }: { request: Request }) => {
    try {
      const records = parseCSV(csvContent);
      const artifacts = transformArtifacts(records);

      return new Response(JSON.stringify(artifacts), {
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
