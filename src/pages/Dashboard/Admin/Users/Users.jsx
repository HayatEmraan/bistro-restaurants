import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useUsers from "../../../../hooks/useUsers";
import axios from "axios";
import {
  MdAdminPanelSettings,
  MdOutlineSupervisorAccount,
} from "react-icons/md";

const Users = () => {
  const [users, isLoading, refetch] = useUsers();
  const handleAdmin = (id, item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${
        item.admin ? "You want remove admin!" : "You want to made admin!"
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${
        item.admin ? "Yes, remove admin!" : "Yes, make admin!"
      }`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:3000/api/admin/users/patch/${id}`)
          .then(function (response) {
            console.log(response);
            if (response.data.modifiedCount === 1) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${item.admin ? "Admin Removed!" : "Admin Made!"}`,
                showConfirmButton: false,
                timer: 1000,
              });
              refetch();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/admin/users/delete/${id}`)
          .then(function (response) {
            console.log(response);
            if (response.data.deletedCount === 1) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Admin Deleted!.",
                showConfirmButton: false,
                timer: 1000,
              });
              refetch();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };
  return (
    <div className="w-full border p-8 rounded-md ml-8">
      <div className="overflow-x-auto w-full">
        <div className="font-cinzel mx-4 text-3xl font-semibold mb-4">
          <h2>total users: {users?.length}</h2>
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.admin ? (
                      <MdAdminPanelSettings
                        className="bg-red-500 p-2 rounded-full text-white text-4xl cursor-pointer"
                        onClick={() => handleAdmin(item._id, item)}
                      ></MdAdminPanelSettings>
                    ) : (
                      <MdOutlineSupervisorAccount
                        className="bg-red-500 p-2 rounded-full text-white text-4xl cursor-pointer"
                        onClick={() => handleAdmin(item._id, item)}
                      />
                    )}
                  </td>
                  <th onClick={() => handleDelete(item._id)}>
                    <FaRegTrashAlt className="bg-red-500 p-2 rounded-full text-white text-4xl cursor-pointer" />
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
