import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags?: any[];
  userId?: {
    _id: string;
    username: string;
  };
}

export function useContent() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setContents([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: token
        }
      });
      setContents(response.data.content || []);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching content:", err);
      setError(err.response?.data?.message || "Failed to fetch content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { contents, refresh, loading, error };
}   