import axios from 'axios';

// Define the sensor data interface
export interface SensorData {
  ph: number;
  moisture: number;
  tds: number;
  humidity: number;
  temperature: number;
}

// Create a dedicated service for ESP8266 sensor data
class ESPSensorService {
  // Base URL for the ESP8266 server
  private baseURL = 'http://192.168.160.12';

  // Axios instance with base configuration
  private api = axios.create({
    baseURL: this.baseURL,
    timeout: 5000, // 5 seconds timeout
  });

  // Fetch latest sensor data
  async getSensorData(): Promise<SensorData> {
    try {
      const response = await this.api.get<SensorData>('/data');
      return response.data;
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      throw error;
    }
  }

  // Real-time data fetching with callback
  async fetchRealTimeData(
    callback: (data: SensorData) => void, 
    intervalMs: number = 1000
  ) {
    const fetchData = async () => {
      try {
        const data = await this.getSensorData();
        callback(data);
      } catch (error) {
        console.error('Real-time data fetch failed:', error);
      }
    };

    // Initial fetch
    await fetchData();

    // Set up interval
    const intervalId = setInterval(fetchData, intervalMs);

    // Return cleanup function
    return () => clearInterval(intervalId);
  }

  // Method to check server health
//   async checkServerConnection(): Promise<boolean> {
//     try {
//       await this.api.get('/');
//       return true;
//     } catch (error) {
//       console.error('Server connection failed:', error);
//       return false;
//     }
//   }
}

// Export a singleton instance
export const espSensorService = new ESPSensorService();