import { useState, useEffect, useCallback } from 'react';
import { getHealthStatus } from '../services/api.js';

export const useHealthCheck = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const check = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getHealthStatus();
      setData(response.data);
    } catch (err) {
      setError(err.message || 'Unable to connect to CodeForge API');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return {
    data,
    loading,
    error,
    refetch: check,
  };
};
