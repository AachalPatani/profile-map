import React from "react";
import { useForm } from "react-hook-form";

const AdminPanel = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Profile submitted:", data);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" required />
        <input {...register("photo")} placeholder="Photo URL" required />
        <textarea {...register("description")} placeholder="Description" required />
        <button type="submit">Add Profile</button>
      </form>
    </div>
  );
};

export default AdminPanel;
