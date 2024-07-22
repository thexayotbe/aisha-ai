import React from "react";
import { IMessage } from "../../interfaces";
import FormattedText from "./MarkDown";

// Define the object type

interface ChatWindowProps {
  messages: IMessage[];
}

const ChatComponent: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="w-full h-[90vh]  py-5 overflow-y-auto flex justify-center">
      <div className="w-[80vw] flex flex-col">
        {messages.map((item) => {
          return (
            <div
              key={item.id}
              className={`${
                item.role === "user"
                  ? "bg-[#1f2e28] ml-auto"
                  : "bg-transparent mr-auto"
              } w-auto h-auto py-3 px-8  rounded-2xl max-w-[70%]  my-4 text-white`}
            >
              <p className="text-[16px] text-justify leading-[40px]">
                <FormattedText text={item.content} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatComponent;
