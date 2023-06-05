import React from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_IMGBB_API_KEY;
const Items = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const [axiosInstance] = useAxiosSecure();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.photo[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((update) => {
        if (update.success) {
          delete data.photo;
            data.image = update.data.display_url;
            data.price = parseInt(data.price);
          axiosInstance.post("/api/admin/items/post", data).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Item added successfully",
                showConfirmButton: false,
                timer: 1000,
              });
            } else {
              console.log("Item not added");
            }
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-3/4 p-8 h-fit">
      <div>
        <SectionTitle
          heading={"ADD AN ITEM"}
          subHeading={"What's new?"}
        ></SectionTitle>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body bg-[#F3F3F3] rounded-md p-12"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            name="name"
            placeholder="Name"
            className="input input-bordered"
          />
        </div>
        <div className="flex gap-8">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <select {...register("category")} className="input input-bordered">
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              name="price"
              placeholder="Enter here..."
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            rows={6}
            {...register("recipe")}
            placeholder="Details about the recipe..."
            className="p-4 rounded-lg"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input type="file" {...register("photo")} id="" />
        </div>
        <div className="form-control w-1/6 mt-6">
          <input
            className="bg-gradient-to-r from-[#835D23] to-[#B58130] text-white w-fit px-4 py-2 rounded-md cursor-pointer"
            type="submit"
            value="Add Item"
          />
        </div>
      </form>
    </div>
  );
};

export default Items;
