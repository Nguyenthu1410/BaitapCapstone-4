// src/services/apiClients.ts

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
    headers: {
      "TokenCybersoft": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjIwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTg2MjQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzkwMDEwMDAwfQ.EeWR303-_B1UvS0JNqgB9-oekCYMonI_KPT2LceiOb8", 
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // Nếu vẫn lỗi, nó sẽ hiện mã lỗi cụ thể ở đây (ví dụ: Lỗi api: 403)
    throw new Error(`Lỗi api: ${res.status}`);
  }

  return res.json();
};