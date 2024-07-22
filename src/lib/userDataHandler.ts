import { User } from "../interfaces";

export const pwCheck = (value: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
  return regex.test(value);
};

export const pwIsSame = (value1: string, value2: string) => {
  return value1 === value2;
};

export const dataFilter = (
  userData: object,
  setUserData: any,
  e: React.ChangeEvent<HTMLInputElement>,
  setPasswordConfirm: any,
) => {
  if (e.target.name === "consent")
    return setUserData({
      ...userData,
      consent: "true",
    });
  if (e.target.name === "phone_number")
    return setUserData({
      ...userData,
      [e.target.name]: `+998${e.target.value}`,
    });
  if (e.target.name === "confirm_password")
    return setPasswordConfirm(e.target.value);
  setUserData({
    ...userData,
    [e.target.name]: e.target.value,
  });
};

export const isUserDataComplete = (user: User): boolean => {
  return Object.values(user).every((value) => value !== "");
};
