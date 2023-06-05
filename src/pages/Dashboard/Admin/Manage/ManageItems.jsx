import React from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { FaRegTrashAlt } from "react-icons/fa";
import useMenu from "../../../../hooks/useMenu";
import { BiEditAlt } from "react-icons/bi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageItems = () => {
  const [data, isLoading, refetch] = useMenu();
  const [axiosInstance] = useAxiosSecure();
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
        axiosInstance
          .delete(`http://localhost:3000/menu/${id}`)
          .then(function (response) {
            if (response.data.deletedCount === 1) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Product Deleted!",
                showConfirmButton: false,
                timer: 1000,
              });
              refetch();
            }
          });
      }
    });
  };
  return (
    <div className="w-full p-8 h-fit">
      <div>
        <SectionTitle
          heading={"Manage All Items"}
          subHeading={"Hurry Up!"}
        ></SectionTitle>
      </div>
      <div className="rounded-md">
        <div className="w-full border p-8 rounded-md ml-8">
          <div className="overflow-x-auto w-full">
            <div className="font-cinzel text-3xl font-semibold mb-4">
              <h2>total Products: {data?.length}</h2>
            </div>
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.image} alt="" />
                          </div>
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <th onClick={() => handleDelete(item._id)}>
                        <BiEditAlt className="bg-red-500 p-2 rounded-full text-white text-4xl cursor-pointer" />
                      </th>
                      <th onClick={() => handleDelete(item._id)}>
                        <FaRegTrashAlt className="bg-red-500 p-2 rounded-full text-white text-4xl cursor-pointer" />
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
