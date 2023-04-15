import { User } from "firebase/auth";
import axios from "axios";

export const getUserAccount = async (phoneNumber: string): Promise<string> => {
  return (
    await axios.get("/api/trusted-app/accounts/search", {
      params: {
        phone: phoneNumber,
      },
      headers: {
        "X-App-Id": process.env.trusted_app_id,
        "X-App-Secret": process.env.trusted_app_secret,
      },
    })
  ).data;
};

export const impersonateUser = async (data: string): Promise<string> => {
  return (
    await axios.post(
      `http://localhost:5000/api/trusted-app/impersonate?user_id=${data}`,
      null,
      {
        headers: {
          "X-App-Id": process.env.trusted_app_id,
          "X-App-Secret": process.env.trusted_app_secret,
        },
      }
    )
  ).data;
};
export const submitTransaction = async (
  data: any,
  receiveUser: User,
  sendUser: User,
  bankName: string,
  bankNumber: string,
  amount: number
): Promise<void> => {
  await axios.post(
    "http://localhost:5000/api/transactions/submit",
    {
      from_account_id: sendUser?.uid,
      to_bank: bankName,
      to_bank_account_number: bankNumber,
      to_name: receiveUser.displayName,
      amount: amount,
      description: `${sendUser.displayName} chuyen tien`,
      pin: "123456",
    },
    {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    }
  );
};
