import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/users");

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:7000/api/user/${id}`)
      .then((res) => {
        toast.success(res.data.msg, { position: "top-center" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-screen text-lg font-semibold text-center">
        <Link to={"/create"}>
          <button className="m-2 px-2 rounded-md text-white font-bold bg-blue-600 shadow-xl">
            Add User
          </button>
        </Link>
        <table className="border-separate border-spacing-2 border border-slate-500 p-4">
          <thead>
            <tr>
              <th className="border border-slate-500 p-2">S. No</th>
              <th className="border border-slate-500 p-2">User Name</th>
              <th className="border border-slate-500 p-2">Email</th>
              <th className="border border-slate-500 p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((curUser, index) => {
              return (
                <tr key={index}>
                  <td className="border border-slate-500 p-2">{index + 1}</td>
                  <td className="border border-slate-500 p-2">
                    {curUser.fname} {curUser.lname}
                  </td>
                  <td className="border border-slate-500 p-2">
                    {curUser.email}
                  </td>
                  <td className="border border-slate-500 p-2 ">
                    <Link to={`/update/` + curUser._id}>
                      <button className="m-2 px-2 rounded-md text-white font-bold bg-slate-500 shadow-xl">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="m-2 px-2 rounded-md text-white font-bold bg-red-500 shadow-xl"
                      onClick={() => handleDelete(curUser._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
