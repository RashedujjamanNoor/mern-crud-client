import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Update = () => {
  const navigate = useNavigate();
  const userData = {
    fname: "",
    lname: "",
    email: "",
  };
  const [user, setUser] = useState(userData);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:7000/api/update/${id}`, user)
      .then((res) => {
        toast.success(res.data.msg, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-500">
      <form
        onSubmit={handleUpdate}
        className="bg-slate-700 p-4 m-2 text-white flex flex-col gap-3 rounded-md"
      >
        <div>
          <h1 className="font-bold text-center text-gray-200">Update User</h1>
        </div>
        <div className="flex flex-col">
          <label>First Name</label>
          <input
            name="fname"
            value={user.fname}
            type="text"
            placeholder="Enter your first name"
            className="p-2 text-sm font-semibold rounded-md border-none outline-none text-black w-80 "
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col">
          <label>Last Name</label>
          <input
            value={user.lname}
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
            value={user.email}
            name="email"
            type="email"
            placeholder="example@gmail.com"
            className="p-2 text-sm font-semibold rounded-md border-none outline-none text-black w-80 "
            onChange={handleInput}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 my-4 p-2 rounded-md font-bold text-gray-300"
        >
          Update
        </button>
        <Link to={"/"}>Back</Link>
      </form>
    </div>
  );
};

export default Update;
