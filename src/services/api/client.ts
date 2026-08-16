import axios from 'axios';

// Initially, we use a mock delay to simulate network latency
const MOCK_DELAY = 800;

export const apiClient = axios.create({
  baseURL: 'https://api.foodora.mock', // Placeholder
  timeout: 10000,
});

// Helper for mock data fetching
export const mockFetch = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, MOCK_DELAY);
  });
};
