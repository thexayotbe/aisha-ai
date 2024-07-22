import { useNavigate } from "react-router-dom";

const AuthMain = () => {
  const navigate = useNavigate();
  return (
    <div className="auth_main">
      <div className="auth_box">
        <img src="/logo.svg" alt="" />
        <h1 className="title">Aisha AI</h1>
        <button
          className="w-[300px] h-[56px] flex bg-[#2e2e2d] border-2 border-[#6b6b6b] text-white rounded-md items-center justify-center text-xl pl-14 "
          onClick={() => navigate("/auth/signup")}
        >
          Ro’yxatdan o’tish
          <div className="w-[56px] h-[56px] flex border-l-2  border-[#6b6b6b] justify-center items-center ml-auto">
            <img src="/Icon.svg" alt="" />
          </div>
        </button>
        <button
          className="w-[300px] h-[56px] flex bg-[#2e2e2d] border-2 border-[#6b6b6b] text-white rounded-md items-center justify-center text-xl pl-14 "
          onClick={() => navigate("/auth/login")}
        >
          Tizimga kirish
          <div className="w-[56px] h-[56px] flex border-l-2  border-[#6b6b6b] justify-center items-center ml-auto">
            <img src="/arrow.svg" alt="" />
          </div>
        </button>
      </div>
      <img src="/gradient.svg" alt="" className="absolute bottom-0 z-auto" />{" "}
    </div>
  );
};

export default AuthMain;
