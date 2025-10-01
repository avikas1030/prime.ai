// Dynamic server URL based on environment
export const serverUrl = process.env.NODE_ENV === 'production' 
  ? "https://prime-ai-backend.onrender.com"
  : "http://localhost:8000";

