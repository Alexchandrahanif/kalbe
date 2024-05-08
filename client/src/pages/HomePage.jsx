import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <button
          className=" bg-blue-600 w-[100px] h-[30px] rounded-lg text-white"
          onClick={(e) => {
            localStorage.clear(),
              navigate("/login"),
              message.success("Sampai jumpa lagi !!");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
