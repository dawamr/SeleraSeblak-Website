export const sanitizeHtml = (html: string) => {
  // Basic sanitization, bisa ditambahkan sesuai kebutuhan
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/on\w+="[^"]*"/g, '');
};
