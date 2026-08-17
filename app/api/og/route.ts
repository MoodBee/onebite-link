import { fetchOpenGraphData } from "@/lib/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url");

  if (!rawUrl) {
    return Response.json(
      { error: "url query parameter is required" },
      { status: 400 },
    );
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(rawUrl);
  } catch {
    return Response.json({ error: "invalid url" }, { status: 400 });
  }

  if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
    return Response.json({ error: "unsupported protocol" }, { status: 400 });
  }

  const data = await fetchOpenGraphData(targetUrl);
  return Response.json(data);
}
