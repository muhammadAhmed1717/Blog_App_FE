export const apiRequest = async ({ endpoint, method, token , body }) => {
    const baseURL = 'http://localhost:5000';
    console.log('BASE URL: ', baseURL);
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          authtoken: token,
        },
      };
      console.log('Headerss', options);
      if (body) {
        options.body = JSON.stringify(body);
      }
  
      const response = await fetch(`${baseURL}${endpoint}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Request Error:', error);
      return { success: false, error: error.message };
    }
  };
  