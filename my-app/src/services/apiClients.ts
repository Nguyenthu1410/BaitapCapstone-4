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
      // BẮT BUỘC: Bạn phải điền đúng TokenCybersoft mà trung tâm cấp vào đây
      "TokenCybersoft": "BỎ_TOKEN_CỦA_BẠN_VÀO_ĐÂY", 
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // Nếu vẫn lỗi, nó sẽ hiện mã lỗi cụ thể ở đây (ví dụ: Lỗi api: 403)
    throw new Error(`Lỗi api: ${res.status}`);
  }

  return res.json();
};