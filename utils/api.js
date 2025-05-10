// utils/api.js
const API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

export async function getCategories() {
  const response = await fetch(`${API_URL}/api/categories`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке категорий: ${response.statusText || response.status}`);
  }
  const data = await response.json();
  console.log('Categories data:', data);
  if (!data.data || !Array.isArray(data.data)) {
    throw new Error('Неверный формат данных категорий');
  }
  return data.data;
}

export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке товаров: ${response.statusText || response.status}`);
  }
  const data = await response.json();
  console.log('Products data:', data);
  if (!data.data || !Array.isArray(data.data)) {
    throw new Error('Неверный формат данных товаров');
  }
  return data.data;
}