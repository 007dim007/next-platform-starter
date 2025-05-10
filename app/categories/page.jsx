// app/categories/page.jsx
import { getCategories } from '../../utils/api';

export async function getStaticProps() {
  const categories = await getCategories();
  return {
    props: { categories },
    revalidate: 60, // Перегенерация страницы каждые 60 секунд
  };
}

export default function CategoriesPage({ categories }) {
  return (
    <div>
      <h1>Категории</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.attributes.name}
          </li>
        ))}
      </ul>
    </div>
  );
}