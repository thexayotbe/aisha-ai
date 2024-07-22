import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [loginData, setLoginData] = useState({});
  const getData = (e: any) => {
    console.log(loginData);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const data = qs.stringify(loginData);
    try {
      const response = await fetch("http://46.101.154.68/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(loginData),
      });
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
        toast("Success");
        navigate("/");
      } else throw new Error("Eror");
    } catch (error) {
      toast.error("Xatolik");
      console.log(error);
      // navigate("/auth/signup");
    }
  };
  return (
    <div className="auth_main">
      <div className="auth_box gap-10">
        <h1 className="title">Tizimga kirish</h1>
        <form action="" className="auth_box" onSubmit={loginHandler}>
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
          <button className="button">Kirish</button>
        </form>
      </div>
      <img src="/gradient.svg" alt="" className="absolute bottom-0 z-auto" />{" "}
    </div>
  );
};

export default Login;
