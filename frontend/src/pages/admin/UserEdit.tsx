import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import { UserType } from "../../types/userType";
import Input, { InputProps } from "../../components/Input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserEdit = () => {
  const { id } = useParams();

  const userId = String(id);

  const { data, refetch, isLoading, error } = useGetUserByIdQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const user: UserType = data;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const inputData: InputProps[] = [
    {
      label: "Name",
      id: "name",
      value: name,
      type: "text",
      placeHolder: "Enter name",
      onChange: (e) => {
        setName(e.target.value);
      },
    },
    {
      label: "Email",
      id: "email",
      value: email,
      type: "email",
      placeHolder: "Enter name",
      onChange: (e) => {
        setEmail(e.target.value);
      },
    },
  ];

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser({ id: userId, name, email, isAdmin }).unwrap();
      toast.success("User updated");
      refetch();
      navigate("/admin/userlist");
    } catch (err: any) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <div className="mx-2 md:mx-0">
        <Link className="mx-2 md:mx-0" to="/admin/userlist">
          <button className="btn w-24 mt-12 mb-6">Go back</button>
        </Link>
      </div>
      <div className="flex flex-col w-96 mx-auto">
        <div className="prose mb-6">
          <h1 className="">Edit User</h1>
        </div>
        {error && <p className="text-red-500">{String(error)}</p>}
        {isLoading && <Loader />}
        {loadingUpdate && <Loader />}
        <form>
          {user && inputData.map((data) => <Input data={data} />)}
          {user && (
            <div className="form-control items-start">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="checkbox checkbox-xs"
                />
                <span className="label-text ml-2">Is Admin</span>
              </label>
            </div>
          )}

          <button
            type="submit"
            onClick={submitHandler}
            className="btn btn-primary mt-4"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UserEdit;
