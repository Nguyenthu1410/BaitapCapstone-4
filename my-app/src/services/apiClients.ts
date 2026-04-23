import next from "next";

export const fetcher = async <T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> => {
  const url = new URL(endpoint);

  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Lỗi api: ${res.status}`);
  }

  return res.json();
};
