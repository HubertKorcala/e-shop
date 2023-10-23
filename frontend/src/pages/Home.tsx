import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { ProductItem } from "../types/productType";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const Home = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

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
          <Meta />
          <div className="mt-4 hidden">
            <ProductCarousel />
          </div>
          <div className="prose my-6 mx-auto">
            <h1>Products</h1>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {data.products.map((product: ProductItem) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <div className="mt-8 mx-auto">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword || ""}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
