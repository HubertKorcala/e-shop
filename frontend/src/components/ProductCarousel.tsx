import { Carousel, Typography } from "@material-tailwind/react";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import { ProductItem } from "../types/productType";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data, isLoading } = useGetTopProductsQuery({});

  const products: ProductItem[] = data;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Carousel
          loop={true}
          autoplay={true}
          className="rounded-xl"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {products.map((product: ProductItem, index: number) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="flex mx-auto relative max-w-max">
                <img
                  src={product.image}
                  alt={`Product Image ${index + 1}`}
                  className=" object-cover rounded-l-xl"
                />
                <img
                  src={product.image}
                  alt={`Product Image ${index + 1}`}
                  className=" object-cover rounded-r-xl"
                />
                <div className="absolute bottom-0 grid h-1/4 w-full place-items-center bg-black/75 rounded-b-xl">
                  <div className=" text-center md:w-2/4">
                    <Typography
                      variant="h2"
                      color="white"
                      className="mb-4 text-3xl md:text-4xl lg:text-3xl"
                    >
                      {`${product.name} (${product.price}$)`}
                    </Typography>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
