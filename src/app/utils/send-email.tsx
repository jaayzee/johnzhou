export function sendEmail(data: { email: string; message: string }) {
    const apiEndpoint = '/api/send-email';
  
    return fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }