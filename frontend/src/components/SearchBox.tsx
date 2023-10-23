import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm.trim()}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="hidden md:block">
      <div className="flex justify-center">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search Products..."
          className="input input-bordered w-full max-w-xs "
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn ml-2">
          Search
        </button>
      </div>
    </form>
  );
};
export default SearchBox;
