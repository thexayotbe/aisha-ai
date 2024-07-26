import Chat from "./Chat";
import Hero from "./Hero";
import { IMessage, User } from "../interfaces";
import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Hamburger from "./ui/Hamburger";

import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const url = "https://aisha-app-zv3mo.ondigitalocean.app";

export default function Home() {
  const auth = useAuthUser() as User;
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [startChat, setStartChat] = useState(false);
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const logOut = () => {
    signOut();
    navigate("/auth");
  };
  const getChatMessages = async (id: number) => {
    const response = await axios.get(`${url}/chats/${id}/messages/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });
    console.log(response.data);
    setMessages(response.data);
    setStartChat(true);
  };

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

    const reqUrl = `${url}/ai_assistant`;
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
      const response = await axios.post(reqUrl, data, {
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
    const reqUrl = `${url}/ai_assistant`;
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
      const response = await axios.post(reqUrl, data, {
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
      // getChats();
    } catch (error) {
      setLoading(false);
      console.error("Error sending message:", error);
    }
    setQuestion("");
  };
  const handleInputChange =
    (setValue: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

  return (
    <div className="w-full h-[100vh] relative">
      {/* sidebar - start */}
      <Sidebar
        setStartChat={setStartChat}
        getChatMessages={getChatMessages}
        messages={messages}
        logOut={logOut}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div
        className={` bg-[#222222]   h-[100vh] transition-all duration-300 ease-in-out    overflow-y-auto relative ${
          isOpen ? "lg:ml-[18vw] lg:w-[82vw] " : "ml-0 w-full"
        }`}
      >
        <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

        {startChat ? (
          <Chat
            sendMessage={sendMessage}
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
