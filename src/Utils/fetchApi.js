// apiRequest.js
export const apiRequest = async ({ endpoint, method, body, header }) => {
    const BASE_URL = 'http://localhost:5000';
    const url = `${BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      token: header?.token, 
      ...(header || {}),
    };
  
    const options = {
      method,
      headers,
      body: method !== 'GET' ? JSON.stringify(body) : null,
    };
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      throw new Error('API request failed');
    }
  
    return await response.json();
  };
  