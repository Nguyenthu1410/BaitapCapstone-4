export const fetcher = async <T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> => {
  let url = endpoint;

  if (Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value);
    });
    
    const queryString = searchParams.toString();
    if (queryString) {
      url = `${endpoint}?${queryString}`;
    }
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

export const poster = async <T>(
  endpoint: string,
  body: any,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
): Promise<T> => {
  console.log(`API URL (${method}):`, endpoint); 

  const res = await fetch(endpoint, {
    method: method,
    headers: {
      "TokenCybersoft": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjIwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTg2MjQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzkwMDEwMDAwfQ.EeWR303-_B1UvS0JNqgB9-oekCYMonI_KPT2LceiOb8", 
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body), 
  });

  const text = await res.text();
  
  if (!res.ok) {
    console.log('API Error:', res.status, text);
    throw new Error(text || `Lỗi api: ${res.status}`);
  }

  // Cố gắng parse JSON, nếu không phải JSON thì trả về text luôn
  try {
    return JSON.parse(text);
  } catch (e) {
    return text as unknown as T;
  }
  // --------------------------------
};
