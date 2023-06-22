import { useEffect, useState } from "react";
import Product from "../components/Product";
import { ProductItem } from "../utils/productType";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState<Array<ProductItem>>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="prose my-6 mx-auto">
        <h1>Latest Products</h1>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
