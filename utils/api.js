// utils/api.js
const API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337'; // Замените на production URL в будущем
const API_TOKEN = process.env.STRAPI_API_TOKEN || ''; // Если Strapi требует токен

// Функция для получения категорий
export async function getCategories() {
  const response = await fetch(`${API_URL}/api/categories`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await response.json();
  return data.data; // Strapi возвращает данные в поле data
}

// Функция для получения товаров
export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await response.json();
  return data.data;
}