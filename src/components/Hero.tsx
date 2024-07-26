import { hero_cards } from "../constants";
import React from "react";
import Loader from "./ui/Loader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "../interfaces";
import Gradient from "./ui/Gradient";

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
  const user = useAuthUser() as User;
  return (
    <div className="w-full lg:h-[100vh]  bg-[#222222] flex justify-center items-center flex-col relative overflow-y-hidden pt-10">
      <img src="/logo.svg" alt="" className="w-[99px] h-[110px]" />
      <h3 className="text-center lg:w-[710px] lg:text-[32px] text:[25px] font-sans font-bold leading-relaxed mt-[24px] mb-16 text-white">
        Assalomu alaykum{" "}
        <span className="uppercase bg-clip-text text-transparent bg-gradient-to-r from-3EF1A6 to-019A5A">
          {user?.first_name} Xayotbek
        </span>
        <br />
        Bugun sizga qanday yordam bera olaman?
      </h3>
      <div className="flex lg:w-[720px] w-[98vw] h-[56px] bg-[#2d2d2d] border-[0.2px] border-[#E5E5E5] rounded-lg items-center gap-5 px-2 z-10">
        <input
          value={value}
          onChange={onInputChange}
          disabled={loading}
          type="text"
          className="bg-transparent w-full h-full text-white placeholder:text-[#656565] px-4  focus:border-none focus-visible:outline-none focus-visible:ring-0 "
          placeholder="Aisha dan nimadir so’ramoqchimisiz?"
          onKeyDown={(e) =>
            e.key == "Enter" || e.key == "13" ? handleStartChat() : ""
          }
        />

        {loading ? (
          <Loader />
        ) : (
          <>
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
          </>
        )}
      </div>
      <div className="flex  max-md:flex-col lg:w-[720px] gap-2 justify-between mt-20">
        {hero_cards.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col lg:w-[211px] w-full h-[184px] items-center justify-center gap-2 rounded-lg p-5 bg-[#1b3c2e] border-[1px] border-[#f3eeee]"
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
      <Gradient />
    </div>
  );
};

export default Hero;
