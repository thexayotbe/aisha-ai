import axios from "axios";
import { hero_cards } from "../constants";
import React, { useEffect } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "../interfaces";

interface ChildProps {
  handleStartChat: () => void; // Adjust the function type as needed
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

const Hero: React.FC<ChildProps> = ({
  handleStartChat,
  value,
  onInputChange,
  loading,
}) => {
  const authHeader = useAuthHeader();
  const auth = useAuthUser() as User;
  useEffect(() => {
    const fetchDt = async () => {
      const respose = await axios.get(`http://46.101.154.68/users/me/`, {
        headers: {
          // "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });
      console.log(respose);
    };
    fetchDt();
  });
  return (
    <div className="w-full h-[97vh]  bg-[#222222] flex justify-center items-center flex-col relative overflow-y-hidden">
      <img src="/logo.svg" alt="" className="w-[99px] h-[100px]" />
      <h3 className="text-center w-[710px] text-4xl font-sans font-bold leading-relaxed my-16 text-white">
        Assalomu alaykum <span className="text-[#019A5A]">Muhammad</span> <br />
        Bugun sizga qanday yordam bera olaman?
      </h3>
      <div className="flex w-[720px] h-[56px] bg-[#2d2d2d] border-[0.2px] border-[#E5E5E5] rounded-lg items-center gap-5 px-2 z-10">
        <input
          value={value}
          onChange={onInputChange}
          type="text"
          className="bg-transparent w-full h-full text-white placeholder:text-[#656565] px-4  focus:border-none focus-visible:outline-none focus-visible:ring-0 "
          placeholder="Aisha dan nimadir so’ramoqchimisiz?"
          onKeyDown={(e) =>
            e.key == "Enter" || e.key == "13" ? handleStartChat() : ""
          }
        />

        <img
          src="/mic.svg"
          alt=""
          className="w-[20px] h-[20px] cursor-pointer"
        />
        <button
          className="w-[50px] h-[43px] bg-[#019A5A] flex items-center justify-center rounded-lg"
          onClick={handleStartChat}
        >
          <img src="/send.svg" alt="" />
        </button>
      </div>
      <div className="flex w-[720px] justify-between mt-20">
        {hero_cards.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col w-[211px] h-[184px] items-center justify-center gap-2 rounded-lg p-5 bg-[#1b3c2e] border-[1px] border-[#f3eeee]"
            >
              <img src={item.icon} alt="" width={25} height={25} />
              <h3 className="text-white text-sm font-bold ">{item.title}</h3>
              <p className="text-white text-[13px] text-center w-full">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
      <img src="/gradient.svg" alt="" className="absolute bottom-0 z-0" />{" "}
    </div>
  );
};

export default Hero;
