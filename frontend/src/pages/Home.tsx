import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { ProductItem } from "../types/productType";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery({});

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      return (
        <div>
          <ErrorMessage message={errMsg} />
        </div>
      );
    } else {
      return <ErrorMessage message={error.message} />;
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="prose my-6 mx-auto">
            <h1>Latest Products</h1>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {products.map((product: ProductItem) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
