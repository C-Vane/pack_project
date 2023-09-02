import { useState } from 'react';

export enum FetchMethod {
  'GET' = 'GET',
  'POST' = 'POST',
  'PATCH' = 'PATCH',
  'DELETE' = 'DELETE',
}
export function useApi<RequestData = {}, ResponseData = {}>(
  url: string,
  method: FetchMethod
): [(data: RequestData) => void, ResponseData, boolean, string] {
  const [data, setData] = useState<ResponseData>({} as ResponseData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!url || !method) {
    throw new Error('Invalid parameters for API hook');
  }

  const request = async (body: RequestData) => {
    setIsLoading(true);
    try {
      const init: RequestInit = {
        method,
      };

      if (body) {
        init.body = JSON.stringify(body);
      }

      const response = await fetch(url, init);

      if (!response.ok || response.status > 201) {
        throw new Error(response.statusText);
      }
      const data = await response.json();

      setData(data?.user);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }

    setIsLoading(false);
  };

  return [request, data, isLoading, error];
}
