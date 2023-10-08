import { Link, useNavigate, useParams } from "react-router-dom";
import Input, { InputProps } from "../../components/Input";
import { useEffect, useState } from "react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";
import { ProductItem } from "../../types/productType";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Message/ErrorMessage";
import { toast } from "react-toastify";

const ProductEdit = () => {
  const { id: productId } = useParams();

  const { data, isLoading, error } = useGetProductByIdQuery(String(productId));

  const product: ProductItem = data;

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [countInStock, setCountInStock] = useState(product?.countInStock || "");
  const [category, setCategory] = useState(product?.category || "");
  const [description, setDescription] = useState(product?.description || "");

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setDescription(product.description);
    }
  }, [product]);

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

  const inputData: InputProps[] = [
    {
      label: "Name",
      type: "text",
      id: "name",
      value: name,
      placeHolder: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      label: "Price",
      type: "number",
      id: "price",
      value: String(price),
      placeHolder: String(price),
      onChange: (e) => setPrice(Number(e.target.value)),
    },
    {
      label: "Brand",
      type: "text",
      id: "brand",
      value: brand,
      placeHolder: brand,
      onChange: (e) => setBrand(e.target.value),
    },
    {
      label: "Count In Stock",
      type: "number",
      id: "stock",
      value: String(countInStock),
      placeHolder: String(countInStock),
      onChange: (e) => setCountInStock(Number(e.target.value)),
    },
    {
      label: "Category",
      type: "text",
      id: "category",
      value: category,
      placeHolder: category,
      onChange: (e) => setCategory(e.target.value),
    },
    {
      label: "Description",
      type: "text",
      id: "description",
      value: description,
      placeHolder: description,
      onChange: (e) => setDescription(e.target.value),
    },
  ];

  const updateProductHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct = {
      productId,
      name: name,
      price: price,
      brand: brand,
      countInStock: countInStock,
      category: category,
      description: description,
    };

    const result: any = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated");
      navigate("/admin/productlist");
    }
  };
  return (
    <>
      <div className="mx-2 md:mx-0">
        <Link className="mx-2 md:mx-0" to="/admin/productlist">
          <button className="btn w-24 mt-12 mb-6">Go back</button>
        </Link>
      </div>
      <div className="flex flex-col w-96 mx-auto">
        <div className="prose mb-6">
          <h1 className="">Edit Product</h1>
        </div>
        {isLoading && <Loader />}
        <form>
          {product &&
            inputData.map((input) => <Input key={input.id} data={input} />)}
          <button
            type="submit"
            onClick={updateProductHandler}
            className="btn btn-primary mt-4"
            disabled={loadingUpdate}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductEdit;
