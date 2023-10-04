import { useEffect, useState } from "react";
import Input, { InputProps } from "../components/Input";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useProfileMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo?.email, userInfo?.name]);

  const inputData: InputProps[] = [
    {
      label: "Name",
      type: "text",
      id: "name",
      value: name,
      placeHolder: "Enter name",
      onChange: (e) => {
        setName(e.target.value);
      },
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      value: email,
      placeHolder: "Enter email",
      onChange: (e) => {
        setEmail(e.target.value);
      },
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      value: password,
      placeHolder: "Enter password",
      onChange: (e) => {
        setPassword(e.target.value);
      },
    },
    {
      label: "Confirm Password",
      type: "password",
      id: "confirmPassword",
      value: confirmPassword,
      placeHolder: "Confirm password",
      onChange: (e) => {
        setConfirmPassword(e.target.value);
      },
    },
  ];

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo?._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials(res));
        setPassword("");
        setConfirmPassword("");
        toast.success("User profile updated!");
      } catch (error: any) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <>
      <div className="prose my-4">
        <h1> User Profile</h1>
      </div>
      <div className="">
        {inputData.map((data) => (
          <Input data={data} key={data.id} />
        ))}
        <button
          className="btn btn-primary"
          type="submit"
          onClick={submitHandler}
        >
          Update
        </button>
        {loadingUpdateProfile && <Loader />}
      </div>
    </>
  );
};

export default Profile;
