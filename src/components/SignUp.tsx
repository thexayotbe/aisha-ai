// http://68.183.214.151/

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { dataFilter, pwCheck, pwIsSame } from "../lib/userDataHandler";
import { User } from "../interfaces";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export const SignUp = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [firstPageFilled, setFirstPageFilled] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [pwStatus, setPwStatus] = useState({
    status: true,
    areSame: true,
  });
  const [userData, setUserData] = useState<User>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "user",
    birth_date: "",
    phone_number: "",
    consent: "",
  });

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(pwStatus);
    getDataHandler(e);
    setPwStatus({
      status: pwCheck(e.target.value),
      areSame: pwIsSame(userData.password, passwordConfirm),
    });
  };

  const getDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dataFilter(userData, setUserData, e, setPasswordConfirm);
  };
  const addUserHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (firstPageFilled) return setFirstPageFilled(false);
    try {
      const response = await axios.post(
        "http://46.101.154.68/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response);
      const { user, access_token } = response.data;

      if (
        signIn({
          auth: {
            token: access_token,
            type: "Bearer",
          },
          userState: { ...user },
        })
      ) {
        toast("Success");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast("Xatolik");
      // navigate("/auth/signup");
    }
  };
  return (
    <div className="auth_main">
      <div className="auth_box gap-5">
        <h3 className="title"> Ro’yxatdan o’tish</h3>
        <form className="auth_box" onSubmit={addUserHandler}>
          {firstPageFilled ? (
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input_short"
                  placeholder="Ismingizni kiriting.."
                  name="first_name"
                  required
                  onChange={getDataHandler}
                />
                <input
                  type="text"
                  className="input_short"
                  placeholder="Familyangizni kiriting.."
                  required
                  name="last_name"
                  onChange={getDataHandler}
                />
              </div>
              <input
                type="email"
                className="input"
                placeholder="Email manzilingizni kiriting"
                required
                name="email"
                onChange={getDataHandler}
              />
              <input
                type="text"
                className="input"
                placeholder="qiziqishlaringiz | ixtiyoriy"
              />
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="input_short"
                  placeholder="Telefon raqamingiz"
                  required
                  name="phone_number"
                  onChange={getDataHandler}
                />
                <input
                  type="date"
                  className="input_short"
                  placeholder="Select date"
                  required
                  name="birth_date"
                  onChange={getDataHandler}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <input
                    type="password"
                    className="input_short"
                    placeholder="Parol yarating"
                    required
                    name="password"
                    onChange={(e) => passwordHandler(e)}
                  />
                  {/* <span className="text-xs text-red-600 pt-2 pr-2">
                    {!pwStatus.status &&
                      "Kamida bita xarf yoki raqam talab etiladi"}
                  </span> */}
                </div>
                <div className="flex flex-col">
                  <input
                    type="password"
                    className="input_short"
                    placeholder="Parolni takrorlang"
                    required
                    name="confirm_password"
                    onChange={(e) => passwordHandler(e)}
                  />
                  {/* <span className="text-xs text-red-600 pt-2 pr-2">
                    {!pwStatus.areSame ? "Parollar bir xil emas" : ""}
                  </span> */}
                </div>
              </div>
              <div className="input flex justify-around gap-5 items-center">
                <input
                  name="consent"
                  type="checkbox"
                  className="accent-[#0B814F] w-[18px] h-[18px]"
                  required
                  onChange={(e) => getDataHandler(e)}
                />
                <p className="text-xs w-[95%]">
                  Aisha-dan g‘arazli maqsadlarda foydalanmaslikka va noqonuniy
                  ishlarni buyurmaslikka rozilik bering / omaviy ofertaga
                  rozilik bering.
                </p>
              </div>
            </>
          )}
          <button className="button" type="submit">
            Keyingisi
          </button>
        </form>
      </div>
      <img src="/gradient.svg" alt="" className="absolute bottom-0 z-auto" />{" "}
    </div>
  );
};

export default SignUp;
