async function debugFetch() {
  const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=Sangiran";
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    console.log("Status:", res.status);
    const txt = await res.text();
    console.log("Response (first 200 chars):", txt.substring(0, 200));
  } catch (e) {
    console.log("Fetch error:", e.message);
  }
}
debugFetch();
