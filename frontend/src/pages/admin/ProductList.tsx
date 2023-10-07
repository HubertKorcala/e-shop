import { BiSolidEdit } from "react-icons/bi";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Message/ErrorMessage";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import { ProductItem } from "../../types/productType";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductList = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery(null);

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const editProductHandler = (id: string) => {
    console.log(id);
  };

  const deleteProductHandler = (id: string) => {
    console.log(id);
  };

  const addProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct(null);
        refetch();
        toast.success("Product Created Successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <div className="">
      <div className=" my-4 flex justify-between w-full">
        <div className="prose">
          <h1>Products</h1>
        </div>
        <button onClick={addProductHandler} className="btn btn-primary">
          Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loadingCreate && <Loader />}
            {isLoading && <Loader />}
            {error && (
              <>
                <ErrorMessage message={String(error)} />
              </>
            )}
            {!isLoading &&
              products.map((product: ProductItem, index: number) => (
                <tr className="hover" key={index}>
                  <td>{String(product._id)}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editProductHandler(product._id)}
                        className="btn btn-xs"
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="btn btn-xs"
                      >
                        <FaTrash style={{ color: "#8b0000" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
