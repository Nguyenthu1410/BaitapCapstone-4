export const fetcher = async <T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> => {
  let url: string;

  if (Object.keys(params).length > 0) {
    const urlObj = new URL(endpoint);
    Object.entries(params).forEach(([key, value]) => {
      if (value) urlObj.searchParams.append(key, value);
    });
    url = urlObj.toString();
  } else {
    url = endpoint;
  }

  console.log('API URL:', url); 

  const res = await fetch(url, {
    next: { revalidate: 3600 },
    headers: {
      "TokenCybersoft": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjIwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTg2MjQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzkwMDEwMDAwfQ.EeWR303-_B1UvS0JNqgB9-oekCYMonI_KPT2LceiOb8", 
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.log('API Error:', res.status, res.statusText);
    throw new Error(`Lỗi api: ${res.status}`);
  }

  return res.json();
};