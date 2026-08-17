export type OpenGraphData = {
  ok: boolean;
  title: string;
  description: string;
  thumbnail: string | null;
  url: string;
};

const ENTITY_MAP: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#39": "'",
  apos: "'",
};

function decodeHtmlEntities(value: string): string {
  return value.replace(/&(#39|amp|lt|gt|quot|apos);/g, (_, entity) => ENTITY_MAP[entity] ?? entity);
}

function getMetaTagMap(html: string): Map<string, string> {
  const metaTags = html.match(/<meta\s+[^>]*>/gi) ?? [];
  const map = new Map<string, string>();

  for (const tag of metaTags) {
    const propertyMatch = tag.match(/(?:property|name)\s*=\s*["']([^"']+)["']/i);
    const contentMatch = tag.match(/content\s*=\s*["']([^"']*)["']/i);
    if (propertyMatch && contentMatch) {
      map.set(propertyMatch[1].toLowerCase(), decodeHtmlEntities(contentMatch[1]));
    }
  }

  return map;
}

function extractTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? decodeHtmlEntities(match[1]).trim() : null;
}

function resolveUrl(value: string, base: URL): string | null {
  try {
    return new URL(value, base).toString();
  } catch {
    return null;
  }
}

/**
 * Fetches a page and extracts its Open Graph metadata (title, description,
 * thumbnail image, canonical url). Falls back to <title>/<meta name="description">
 * when Open Graph tags are missing, and never throws — on any failure it
 * resolves with a best-effort fallback so the caller can still save the link.
 */
export async function fetchOpenGraphData(targetUrl: URL): Promise<OpenGraphData> {
  try {
    const response = await fetch(targetUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0; +https://github.com/) OpenGraphFetcher",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      throw new Error(`Unsupported content-type: ${contentType}`);
    }

    const html = await response.text();
    const meta = getMetaTagMap(html);
    const finalUrl = new URL(response.url || targetUrl.toString());

    const title =
      meta.get("og:title") ??
      meta.get("twitter:title") ??
      extractTitleTag(html) ??
      finalUrl.hostname;

    const description =
      meta.get("og:description") ??
      meta.get("twitter:description") ??
      meta.get("description") ??
      "";

    const rawImage = meta.get("og:image") ?? meta.get("twitter:image") ?? null;
    const thumbnail = rawImage ? resolveUrl(rawImage, finalUrl) : null;

    return {
      ok: true,
      title,
      description,
      thumbnail,
      url: finalUrl.toString(),
    };
  } catch {
    return {
      ok: false,
      title: targetUrl.hostname,
      description: "",
      thumbnail: null,
      url: targetUrl.toString(),
    };
  }
}
