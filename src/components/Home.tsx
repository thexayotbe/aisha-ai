import Chat from "./Chat";
import Hero from "./Hero";
import { IChat, IMessage, User } from "../interfaces";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import { PiDotsThree } from "react-icons/pi";
import { CgRename } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Home() {
  const auth = useAuthUser() as User;
  const authHeader = useAuthHeader();
  const [user, setUser] = useState<User | null>(null);
  const [startChat, setStartChat] = useState(false);
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState(false);

  const getChats = async () => {
    const response = await axios.get("http://46.101.154.68/users/me/chats/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });
    setChats(response.data);
  };
  const getChatMessages = async (id: number) => {
    const response = await axios.get(
      `http://46.101.154.68/chats/${id}/messages/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      },
    );
    console.log(response.data);
    setMessages(response.data);
    setStartChat(true);
  };
  useEffect(() => {
    setUser(auth);
    getChats();
  }, []);

  const handleStartChat = async () => {
    setLoading(true);
    setMessages([]);
    setStartChat(true);
    setQuestion("");
    const qws = question;

    const newMessage: IMessage = {
      id: String(messages.length + 1),
      content: question,
      role: "user",
    };
    setMessages((prevResponses) => [...prevResponses, newMessage]);

    const url = "http://46.101.154.68/ai_assistant";
    const headers = {
      "Content-Type": "application/json",
      Authorization: authHeader,
    };

    const data = {
      query: JSON.stringify([{ role: "user", content: qws }]),
      user_id: auth.id,
      chat_id: null,
    };

    try {
      const response = await axios.post(url, data, {
        headers,
        responseType: "stream",
      });

      const res = response.data;
      setLoading(false);
      const newMessage: IMessage = {
        id: String(messages.length + 1),
        content: res,
        role: "assistant",
      };
      getChats();

      setMessages((prevResponses) => [...prevResponses, newMessage]);
    } catch (error) {
      setLoading(false);
      console.error("Error sending message:", error);
    }
  };

  const sendMessage = async (id: number) => {
    const quest = question;
    setQuestion("");
    setLoading(true);
    const newMessage: IMessage = {
      id: String(messages.length + 1),
      content: question,
      role: "user",
    };
    setMessages((prevResponses) => [...prevResponses, newMessage]);
    const url = "http://46.101.154.68/ai_assistant";
    const headers = {
      "Content-Type": "application/json",
      Authorization: authHeader,
    };
    const data = {
      query: JSON.stringify([{ role: "user", content: quest }]),
      user_id: auth.id,
      chat_id: id,
    };

    try {
      const response = await axios.post(url, data, {
        headers,
        responseType: "stream",
      });

      const res = response.data;

      const newMessage: IMessage = {
        id: String(messages.length + 1),
        content: res,
        role: "assistant",
      };
      setMessages((prevResponses) => [...prevResponses, newMessage]);
      setLoading(false);
      getChats();
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setQuestion("");
  };
  const handleInputChange =
    (setValue: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

  const deleteChat = async (chatId: number) => {
    try {
      await axios.delete(`http://46.101.154.68/chats/${chatId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });
      setChats(chats.filter(({ id }) => id !== chatId));
      getChats();
      if (chats.length == 0) {
        setStartChat(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-black  flex justify-center gap-4 items-center">
      <div className="w-[18vw] h-[100vh] bg-[#222222] p-5 flex flex-col">
        <div className="w-[276px] bg-[#313131] h-[70px] rounded-lg flex items-center px-5 gap-4">
          <img src="/avatar.svg" alt="" />
          <div>
            <h1 className="side_title">
              {" "}
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-sm text-[#777777]">Free account </p>
          </div>
        </div>
        <div className="w-[276px] mt-10">
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
                  onClick={() => getChatMessages(chat.id)}
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
          <button className="text-red-500  rounded-md text-sm w-full h-[48px] flex items-center justify-top pl-4 gap-4  hover:bg-[#313131] transition-all">
            <img src="/logout.svg" alt="" />
            Log out
          </button>
        </div>
      </div>
      <div className="w-[82vw] bg-[#222222] rounded-xl h-[97vh]   overflow-y-auto">
        {startChat ? (
          <Chat
            sendMessage={() => sendMessage(0)}
            messages={messages}
            value={question}
            onInputChange={handleInputChange(setQuestion)}
            loading={loading}
          />
        ) : (
          <Hero
            handleStartChat={handleStartChat}
            value={question}
            onInputChange={handleInputChange(setQuestion)}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
