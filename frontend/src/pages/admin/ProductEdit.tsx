import { Link, useNavigate, useParams } from "react-router-dom";
import Input, { InputProps } from "../../components/Input";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { ProductItem } from "../../types/productType";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Message/ErrorMessage";
import { toast } from "react-toastify";

const ProductEdit = () => {
  const { id: productId } = useParams();

  const { data, isLoading, refetch, error } = useGetProductByIdQuery(
    String(productId)
  );

  const product: ProductItem = data;

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setDescription(product.description);
      setImage(product.image);
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
    try {
      await updateProduct({
        productId,
        name,
        price,
        brand,
        countInStock,
        category,
        description,
        image,
      }).unwrap();
      toast.success("Product updated");
      refetch();
      navigate("/admin/productlist");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    if (e.target.files?.length !== 1) {
      return toast.error("Please select only one image");
    }

    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message);
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
          <div className="mb-3 flex flex-col">
            <label htmlFor="image" className="mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              className="file-input file-input-bordered  w-full"
              onChange={uploadFileHandler}
            />
          </div>
          <button
            type="submit"
            onClick={updateProductHandler}
            className="btn btn-primary mt-4"
            disabled={loadingUpdate || loadingUpload}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductEdit;
