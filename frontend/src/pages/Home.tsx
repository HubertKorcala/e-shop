import Product from "../components/Product";
import products from "../products";

const Home = () => {
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
