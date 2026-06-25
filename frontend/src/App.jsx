import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [nextCursor, setNextCursor] = useState("");

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
    const res = await fetch(`${API}/categories`);
    const data = await res.json();

    if (data.success) {
      setCategories(data.categories);
    }
  };

  const loadProducts = async (cursor = "", selectedCategory = category) => {
    let url = `${API}/products?limit=20`;

    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }

    if (cursor) {
      url += `&cursor=${cursor}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (cursor) {
      setProducts((prev) => [...prev, ...data.products]);
    } else {
      setProducts(data.products);
    }

    setNextCursor(data.nextCursor);
  };

  const handleCategory = (e) => {
    const value = e.target.value;

    setCategory(value);
    setNextCursor("");

    loadProducts("", value);
  };

  return (
    <div className="container">
      <h1>Product Explorer</h1>

      <select value={category} onChange={handleCategory}>
        <option value="">All Categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h2>{product.name}</h2>

            <p>{product.category}</p>

            <h3>₹ {product.price}</h3>

            <small>
              {new Date(product.updated_at).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>

      {nextCursor && (
        <button onClick={() => loadProducts(nextCursor)}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;