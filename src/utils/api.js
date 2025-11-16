// src/utils/api.js
const API_URL = "http://localhost:5000/api";

export async function apiRequest(endpoint, method = "GET", data = null, token = null) {
  const headers = { "Content-Type": "application/json" };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  // try parse json safely
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
