import { User } from "firebase/auth";
import axios from "axios";

export const getUserAccount = async (phoneNumber: string): Promise<any> => {
  return (
    await axios.get(
      "https://wallet2.deadlock.lanpn.me/api/trusted-app/accounts/search",
      {
        params: {
          phone: phoneNumber,
        },
        headers: {
          "X-App-Id": import.meta.env.trusted_app_id || "lockchat",
          "X-App-Secret":
            import.meta.env.trusted_app_secret ||
            "23oi23n9013292101n39013912339u3fnef1",
        },
      }
    )
  ).data;
};

export const impersonateUser = async (data: string): Promise<any> => {
  return (
    await axios.post(
      `https://wallet2.deadlock.lanpn.me/api/trusted-app/impersonate?user_id=${data}`,
      null,
      {
        headers: {
          "X-App-Id": import.meta.env.trusted_app_id || "lockchat",
          "X-App-Secret":
            import.meta.env.trusted_app_secret ||
            "23oi23n9013292101n39013912339u3fnef1",
        },
      }
    )
  ).data;
};
export const submitTransaction = async (
  token: any,
  receiveUser?: string,
  sendUser?: User | null,
  sendUserBankAccount?: number,
  bankName?: string,
  bankNumber?: string,
  amount?: number
): Promise<void> => {
  await axios.post(
    "https://wallet2.deadlock.lanpn.me/api/transactions/submit",
    {
      from_account_id: sendUserBankAccount,
      to_bank: bankName,
      to_bank_account_number: bankNumber,
      to_name: receiveUser,
      amount: amount,
      description: `${sendUser?.displayName} chuyen tien`,
      pin: "123456",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
