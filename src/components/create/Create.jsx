import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const userData = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userData);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:7000/api/create", user)
      .then((res) => {
        toast.success(res.data.msg, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-500">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-700 p-4 m-2 text-white flex flex-col gap-3 rounded-md"
        >
          <div>
            <h1 className="font-bold text-center text-gray-200">Create User</h1>
          </div>
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              name="fname"
              type="text"
              placeholder="Enter your first name"
              className="p-2 text-sm font-semibold rounded-md border-none outline-none text-black w-80 "
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              name="lname"
              type="text"
              placeholder="Enter your last name"
              className="p-2 text-sm font-semibold rounded-md border-none outline-none text-black w-80 "
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              className="p-2 text-sm font-semibold rounded-md border-none outline-none text-black w-80 "
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="p-2 text-sm font-semibold rounded-md border-none outline-none text-black w-80 "
              onChange={handleInput}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-700 my-4 p-2 rounded-md font-bold text-gray-300"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
