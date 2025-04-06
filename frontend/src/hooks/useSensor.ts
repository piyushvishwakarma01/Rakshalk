import { useState, useEffect } from 'react';
import { espSensorService, SensorData } from '../lib/sensorData';

export function useESPSensorData(intervalMs: number = 1000) {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let stopPolling: (() => void) | null = null; // Store the stop function

    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await espSensorService.getSensorData();
        if (isMounted) {
          setSensorData(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message);
          setIsLoading(false);
        }
      }
    }

    async function startPolling() {
      try {
        stopPolling = await espSensorService.fetchRealTimeData(
          (data: SensorData) => {
            if (isMounted) {
              setSensorData(data);
              setError(null);
            }
          },
          intervalMs
        );
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message);
        }
      }
    }

    fetchData();
    startPolling();

    return () => {
      isMounted = false;
      if (stopPolling) stopPolling(); // Ensure stopPolling is defined before calling
    };
  }, [intervalMs]);

  return {
    sensorData,
    isLoading,
    error,
    refresh: () => espSensorService.getSensorData(),
  };
}
