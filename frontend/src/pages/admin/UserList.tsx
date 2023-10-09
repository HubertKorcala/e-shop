import { RxCross2 } from "react-icons/rx";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Message/ErrorMessage";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import { UserType } from "../../types/userType";
import { MdDone } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { data: users, refetch, isLoading, isError } = useGetUsersQuery(null);

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const navigate = useNavigate();

  const updateUserHandler = (id: string) => {
    navigate(`/admin/user/${id}/edit`);
  };

  const deleteUserHandler = async (user: UserType) => {
    if (user.isAdmin) {
      return toast.error("Admin cannot be deleted");
    }
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(user._id).unwrap();
        refetch();
        toast.success("User Deleted");
      } catch (err: any) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };
  return (
    <div className="">
      <div className="prose my-6">
        <h1>Users</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <Loader />}
            {loadingDelete && <Loader />}
            {isError && (
              <>
                <ErrorMessage message={""} />
              </>
            )}
            {!isLoading &&
              users &&
              users.map((user: UserType) => (
                <tr className="hover" key={user._id}>
                  <td>{String(user._id)}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <MdDone />
                    ) : (
                      <RxCross2 style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateUserHandler(user._id)}
                        className="btn btn-xs"
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        onClick={() => deleteUserHandler(user)}
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

export default UserList;
