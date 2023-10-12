import { BiSolidEdit } from "react-icons/bi";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Message/ErrorMessage";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import { ProductItem } from "../../types/productType";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

const ProductList = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const navigate = useNavigate();

  const editProductHandler = (id: string) => {
    navigate(`/admin/product/${id}/edit`);
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

  const deleteProductHandler = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await deleteProduct(id).unwrap();
      refetch();
      toast.success("Product Deleted");
    } catch (err: any) {
      toast.error(err?.data?.message || err.message);
    }
  };
  console.log(data);

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
            {loadingDelete && <Loader />}
            {isLoading && <Loader />}
            {error && (
              <>
                <ErrorMessage message={String(error)} />
              </>
            )}
            {!isLoading &&
              data.products.map((product: ProductItem) => (
                <tr className="hover" key={product._id}>
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
      {!isLoading && (
        <div className="mt-8 flex justify-center">
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
