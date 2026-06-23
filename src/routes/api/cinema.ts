// @ts-ignore
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { parseCSV, transformCinema } from "@/lib/csv-parser";
// @ts-ignore
import csvContent from "../../../scraped_cinema.csv?raw";

export const APIRoute = createAPIFileRoute("/api/cinema")({
  GET: ({ request }: { request: Request }) => {
    try {
      const records = parseCSV(csvContent);
      const cinemaEras = transformCinema(records);

      return new Response(JSON.stringify(cinemaEras), {
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
        JSON.stringify({ error: "Failed to load cinema data", details: error.message }),
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
