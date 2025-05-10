// app/products/page.jsx
import { getProducts } from '../../utils/api';

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: 60, // Перегенерация страницы каждые 60 секунд
  };
}

export default function ProductsPage({ products }) {
  return (
    <div>
      <h1>Товары</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.attributes.name} - {product.attributes.price} руб.
          </li>
        ))}
      </ul>
    </div>
  );
}