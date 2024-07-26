// Sidebar.tsx
import React, { useEffect, useState } from "react";
import { IChat, IMessage, User } from "../interfaces";
import { PiDotsThree } from "react-icons/pi";
import { CgRename } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import axios from "axios";

interface SidebarProps {
  setStartChat: React.Dispatch<React.SetStateAction<boolean>>;
  getChatMessages: (id: number) => void;
  messages: IMessage[];
  logOut: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const url = "https://aisha-app-zv3mo.ondigitalocean.app";

const Sidebar: React.FC<SidebarProps> = ({
  setStartChat,
  getChatMessages,
  messages,
  logOut,
  isOpen,
  setIsOpen,
}) => {
  const auth = useAuthUser() as User;
  const authHeader = useAuthHeader();
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<IChat[]>([]);

  const getChats = async () => {
    const response = await axios.get(`${url}/users/me/chats/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });
    setChats(response.data);
  };
  const deleteChat = async (chatId: number) => {
    try {
      await axios.delete(`${url}/chats/${chatId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });
      setChats(chats.filter(({ id }) => id !== chatId));
      getChats();

      setStartChat(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(auth);
    getChats();
  }, []);
  return (
    <div
      className={`lg:w-[18vw] pt-18 w-full h-[100vh] bg-[#222222] fixed ${isOpen && "z-20  lg:animate-none animate-slideInFromLeft  "}   p-5 flex flex-col top-0 left-0 border-r-2 border-[#313131]`}
    >
      <div
        className={`lg:w-[276px]  w-[75vw] bg-[#313131] h-[70px] rounded-lg flex items-center px-5 gap-4 transform `}
      >
        <img src="/avatar.svg" alt="" />
        <div>
          <h1 className="side_title">
            {" "}
            {user?.first_name} {user?.last_name}
          </h1>
          <p className="text-sm text-[#777777]">Free account </p>
        </div>
      </div>
      <div className="lg:w-[276px] w-full mt-10">
        <button
          className="text-white bg-[#0B814F] rounded-md text-sm w-full h-[48px] flex items-center justify-top pl-4 gap-4 "
          onClick={() => setStartChat(false)}
        >
          {" "}
          <img src="./add.svg" alt="" /> Start a new chat
        </button>
        <div className="flex flex-col gap-4 mt-5">
          {chats.map((chat) => {
            return (
              <button
                onClick={() => {
                  getChatMessages(chat.id);
                  setIsOpen(false);
                }}
                key={chat.id}
                className={`text-white ${
                  chat.id === messages[0]?.chat_id && "bg-[#313131]"
                } rounded-md text-sm w-full h-[48px] flex items-center justify-top pl-4 gap-4  hover:bg-[#313131] transition-all`}
              >
                <img src="/chat.svg" alt="" /> {chat.name}{" "}
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <PiDotsThree />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <div className="flex justify-center gap-4 items-center h-[20px] cursor-pointer">
                          <CgRename /> Rename
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div
                          onClick={() => deleteChat(chat.id)}
                          className="flex justify-center gap-4 items-center h-[20px] text-red-500 cursor-pointer"
                        >
                          <MdDeleteOutline />
                          Delete
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-[276px] mt-auto h-[162px] flex flex-col border-t-2 border-[#313131]">
        <button className="text-white  rounded-md text-sm w-full h-[48px] flex items-center justify-top pl-4 gap-4  hover:bg-[#313131] transition-all">
          <img src="/mode.svg" alt="" /> Switch Light Mode
        </button>

        <button className="text-white  rounded-md text-sm w-full h-[48px] flex items-center justify-top pl-4 gap-4  hover:bg-[#313131] transition-all">
          <img src="/faq.svg" alt="" /> Uptades & FAQ
        </button>
        <button
          onClick={logOut}
          className="text-red-500  rounded-md text-sm w-full h-[48px] flex items-center justify-top pl-4 gap-4  hover:bg-[#313131] transition-all"
        >
          <img src="/logout.svg" alt="" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
