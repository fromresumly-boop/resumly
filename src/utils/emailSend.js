export const sendResumeEmail = async (userEmail, pdfBlob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1];

      // In production (unified hosting), frontend & backend share the same origin.
      // In development, VITE_API_URL points to localhost:5000.
      const baseURL = import.meta.env.VITE_API_URL || '';

      try {
        const response = await fetch(`${baseURL}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            toEmail: userEmail,
            pdfBase64: base64String,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to send email');
        }

        const data = await response.json();
        resolve(data);
      } catch (error) {
        console.error('Email API Error:', error);
        reject(error);
      }
    };
  });
};
