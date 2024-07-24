import { useEffect, useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import Loader from "./ui/Loader";

type NotificationType = "success" | "error";
const url = "https://aisha-app-zv3mo.ondigitalocean.app";
const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [loginData, setLoginData] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [notificationType, setNotificationType] =
    useState<NotificationType | null>(null);
  const [api, contextHolder] = notification.useNotification();

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (notificationType) {
      api[notificationType]({
        message: `${notificationType === "success" ? "Muvaffaqiyatli" : "Xatolik"}`,
        description: `${
          notificationType === "success"
            ? "Siz muvaffaqiyatli kirdingiz"
            : "Login yoki parol noto'g'ri"
        }`,
        placement: "bottomRight",
        style: {
          backgroundColor: "white",
          borderRadius: "10px",
        },
      });
      setNotificationType(null); // Reset the notification type after showing the notification
    }
  }, [notificationType, api]);

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`${url}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(loginData as Record<string, string>),
      });
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      console.log(response);
      const res = await response.json();
      const { user, access_token } = res;
      if (
        signIn({
          auth: {
            token: access_token,
            type: "Bearer",
          },
          userState: user,
        })
      ) {
        setLoading(false);
        navigate("/");
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      setLoading(false);
      setNotificationType("error");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth_main">
      <div className="auth_box gap-10">
        <h1 className="title">Tizimga kirish</h1>
        <form className="auth_box" onSubmit={loginHandler}>
          <input
            onChange={getData}
            name="username"
            type="email"
            placeholder="email manzilingizni kiriting"
            className="input"
          />
          <input
            onChange={getData}
            name="password"
            type="password"
            placeholder="Parolingizni kiriting"
            className="input"
          />
          <button className="button" disabled={loading}>
            {loading ? <Loader /> : "Kirish"}{" "}
          </button>
        </form>
      </div>
      {contextHolder}
      <img
        src="/gradient.svg"
        alt=""
        className="absolute bottom-0 z-auto"
      />{" "}
    </div>
  );
};

export default Login;
