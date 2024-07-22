import React from "react";
import ChatComponent from "./ui/ChatComponent";
import { IMessage } from "../interfaces";
import Loader from "./ui/Loader";

interface ChatWindowProps {
  sendMessage: (id: any) => void; // Adjust the function type as needed
  loading: boolean;
  messages: IMessage[];
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Chat: React.FC<ChatWindowProps> = ({
  sendMessage,
  messages,
  value,
  onInputChange,
  loading,
}) => {
  console.log(messages[0].chat_id);
  return (
    <div className="w-full flex flex-col pb-5 items-center">
      <ChatComponent messages={messages} />
      <div className="flex w-[80vw] h-[56px] bg-[#2d2d2d] border-[0.2px] border-[#E5E5E5] rounded-lg items-center gap-5 px-2 z-10 mt-auto">
        <input
          disabled={loading}
          onChange={onInputChange}
          value={value}
          type="text"
          className="bg-transparent w-full h-full text-white placeholder:text-[#656565] px-4  focus:border-none focus-visible:outline-none focus-visible:ring-0 "
          placeholder="Aisha dan nimadir so’ramoqchimisiz?"
          onKeyDown={(e) =>
            e.key == "Enter" || e.key == "13" || loading
              ? sendMessage(messages[0].chat_id)
              : ""
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
              onClick={() => sendMessage(messages[0].chat_id)}
            >
              <img src="/send.svg" alt="" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
