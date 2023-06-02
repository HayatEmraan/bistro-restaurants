import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaRegTrashAlt, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyCart = () => {
  const [cart, refetch] = useCart();
  // how does reduce work!!!
  const total = cart.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (e) => {
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
        fetch(`http://localhost:3000/orders/${e}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount === 1) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your file has been deleted.",
                showConfirmButton: false,
                timer: 1000,
              });
            }
            refetch();
          });
      }
    });
  };

  return (
    <div className="w-full border p-8 rounded-md ml-8 mt-12">
      <Helmet>
        <title>Bistro Boss | My Cart</title>
      </Helmet>
      <div className="overflow-x-auto w-full">
        <div className="font-cinzel flex justify-between mx-4 text-3xl font-semibold mb-4">
          <h2>total orders: {cart?.length}</h2>
          <h2>
            total price: $
            {total}
          </h2>
          <button className="bg-[#D1A054] px-3 rounded-md text-white py-1 text-xl">
            pay
          </button>
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.img} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
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

export default MyCart;
