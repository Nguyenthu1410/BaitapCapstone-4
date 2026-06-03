// const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjIwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTg2MjQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzkwMDEwMDAwfQ.EeWR303-_B1UvS0JNqgB9-oekCYMonI_KPT2LceiOb8";

// const buildHeaders = (): Record<string, string> => {
//   const headers: Record<string, string> = {
//     "TokenCybersoft": TOKEN_CYBERSOFT,
//     "Content-Type": "application/json",
//   };

//   if (typeof window !== 'undefined') {
//     const userString = localStorage.getItem("userLogin");
//     if (userString) {
//       const user = JSON.parse(userString);
//       headers["Authorization"] = `Bearer ${user.accessToken}`;
//     }
//   }

//   return headers;
// };

// // 1. HÀM GET (fetcher)
// export const fetcher = async <T>(
//   endpoint: string,
//   params: Record<string, string> = {},
// ): Promise<T> => {
//   let url = endpoint;

//   if (Object.keys(params).length > 0) {
//     const searchParams = new URLSearchParams();
//     Object.entries(params).forEach(([key, value]) => {
//       if (value) searchParams.append(key, value);
//     });
    
//     const queryString = searchParams.toString();
//     if (queryString) {
//       url = `${endpoint}?${queryString}`;
//     }
//   }

//   console.log('API URL GET:', url); 

//   const res = await fetch(url, {
//     cache: 'no-store', 
//     headers: buildHeaders(), 
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     console.log('API Error GET:', res.status, errorText);
//     throw new Error(errorText || `Lỗi api: ${res.status}`);
//   }

//   return res.json();
// };

// // 2. HÀM POST/PUT/DELETE (poster)
// export const poster = async <T>(
//   endpoint: string,
//   body: any,
//   method: 'POST' | 'PUT' | 'DELETE' = 'POST'
// ): Promise<T> => {
//   console.log(`API URL (${method}):`, endpoint); 

//   const res = await fetch(endpoint, {
//     method: method,
//     headers: buildHeaders(), 
//     body: JSON.stringify(body), 
//   });

//   const text = await res.text();
  
//   if (!res.ok) {
//     console.log('API Error POST:', res.status, text);
//     throw new Error(text || `Lỗi api: ${res.status}`);
//   }

//   try {
//     return JSON.parse(text);
//   } catch (e) {
//     return text as unknown as T;
//   }
// };

const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjIwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTg2MjQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzkwMDEwMDAwfQ.EeWR303-_B1UvS0JNqgB9-oekCYMonI_KPT2LceiOb8";

const buildHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "TokenCybersoft": TOKEN_CYBERSOFT,
    "Content-Type": "application/json",
  };

  if (typeof window !== 'undefined') {
    try {
      const userString = localStorage.getItem("userLogin");
      if (userString) {
        const user = JSON.parse(userString);
        headers["Authorization"] = `Bearer ${user.accessToken}`;
      } else {
        headers["Authorization"] = `Bearer ${TOKEN_CYBERSOFT}`;
      }
    } catch (error) {
      console.error("Lỗi đọc token từ localStorage", error);
    }
  }

  return headers;
};

// 1. HÀM GET (fetcher)
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

  console.log('API URL GET:', url); 

  try {
    const res = await fetch(url, {
      cache: 'no-store', 
      headers: buildHeaders(), 
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log('API Error GET:', res.status, errorText);
      throw new Error(errorText || `Lỗi api: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch GET:', error);
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// 2. HÀM POST/PUT/DELETE (poster)
export const poster = async <T>(
  endpoint: string,
  body: any,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
): Promise<T> => {
  console.log(`API URL (${method}):`, endpoint); 

  try {
    const res = await fetch(endpoint, {
      method: method,
      headers: buildHeaders(), 
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    
    if (!res.ok) {
      console.log('API Error POST:', res.status, text);
      throw new Error(text || `Lỗi api: ${res.status}`);
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      return text as unknown as T;
    }
  } catch (error) {
    console.error('Failed to fetch POST:', error);
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};