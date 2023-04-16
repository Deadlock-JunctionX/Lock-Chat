import { ValidateStatus } from "antd/es/form/FormItem";
import { NumberOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  FormInstance,
  Input,
  message,
  Space,
  theme,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { getUserAccount, impersonateUser, submitTransaction } from "./api";
import PinInput from "react-pin-input";
import { User } from "firebase/auth";
import React from "react";
import BankSelection from "./BankSelection";
import { useStore } from "../../store";
import { getDefaultBankNum, getDefaultPhoneNum } from "../../utils";

const { Title } = Typography;
export interface MoneyTransactionProp {
  otherUser?: User;
  amount?: number;
  destroyModal: () => void;
}

export const MoneyTransaction = (props: MoneyTransactionProp) => {
  const [transactionInfo, setTransactionInfo] = useState<any>();
  const [formValue, setFormValue] = useState<any>({});
  const form = React.useRef<FormInstance>(null);

  const steps = [
    {
      title: "Thông tin chuyển tiền",
      content: (
        <MoneyTransactionForm
          otherUser={props.otherUser}
          form={form}
          amount={props.amount}
        />
      ),
    },
    {
      title: "Nhập mã pin",
      content: (
        <MoneyTransactionPinConfirm
          transactionInfo={transactionInfo}
          receiver={formValue["name"] || props.otherUser?.displayName}
          bankName={formValue["bank"]}
          bankNumber={formValue["bankNumber"]}
          amount={formValue["amount"]}
          destroyModal={props.destroyModal}
        />
      ),
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
    setFormValue(form.current?.getFieldsValue());
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Space
        direction="horizontal"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <Title level={5}>{steps[current].title}</Title>
      </Space>
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          {current == 0 && (
            <Button
              style={{ backgroundColor: "#4096ff" }}
              type="primary"
              onClick={() => {
                getUserAccount(form.current?.getFieldValue("phoneNumber")).then(
                  (data) => {
                    setTransactionInfo(data);
                  }
                );
                next();
              }}
            >
              Hoàn thành
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
};

const MoneyTransactionForm = ({
  setUserAccountInfo,
  setStatus,
  otherUser,
  form,
  amount,
}: any) => {
  const onFinish = (values: any) => {
    getUserAccount(form.current?.getFieldValue("bankNumber")).then((data) => {
      setUserAccountInfo(data);
      setStatus(true);
    });
  };

  const currentUser = useStore((state) => state.currentUser);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    form.current?.setFieldsValue({
      name: otherUser?.displayName,
      bankNumber: getDefaultBankNum(otherUser?.email),
      amount: amount || 0,
      phoneNumber:
        currentUser?.phoneNumber || getDefaultPhoneNum(currentUser?.email),
    });
  }, [otherUser, amount]);

  return (
    <Form
      ref={form}
      name="send-money-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Bạn muốn chuyển khoản đến"
        name="bank"
        rules={[{ required: true, message: "Please input your bank!" }]}
      >
        <BankSelection />
      </Form.Item>

      <Form.Item
        label="Số tài khoản người nhận"
        name="bankNumber"
        rules={[{ required: true, message: "Please input your STK" }]}
      >
        <Input
          placeholder="_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _"
          prefix={<NumberOutlined />}
          bordered={false}
        />
      </Form.Item>

      <Form.Item
        label="Số điện thoại người gửi"
        name="phoneNumber"
        rules={[{ required: true, message: "Please input your STK" }]}
      >
        <Input
          placeholder="_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _"
          prefix={<NumberOutlined />}
          bordered={false}
        />
      </Form.Item>

      <Form.Item
        label="Họ tên người nhận"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input prefix={<UserOutlined />} bordered={false} />
      </Form.Item>

      <Form.Item
        label="Số tiền muốn chuyển"
        name="amount"
        rules={[{ required: true, message: "Nhập số tiền muốn chuyển" }]}
      >
        <Input
          placeholder="_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _"
          bordered={false}
        />
      </Form.Item>
    </Form>
  );
};

const MoneyTransactionPinConfirm = ({
  transactionInfo,
  receiver,
  bankName,
  bankNumber,
  amount,
  destroyModal,
}: any) => {
  const [pinValue, setPinValue] = useState<string>("");
  const [pinStatus, setPinStatus] = useState<ValidateStatus>();
  const [pinErrorMsg, setPinErrorMsg] = useState<string>();
  const currentUser = useStore((state) => state.currentUser);

  const validatePin = (pin: string) => {
    return pin === "123456";
  };
  useEffect(() => {
    if (pinValue.length === 6) {
      if (validatePin(pinValue))
        impersonateUser(transactionInfo?.user_id).then((data) => {
          submitTransaction(
            data?.token,
            receiver,
            currentUser || null,
            transactionInfo?.id,
            bankName,
            bankNumber,
            amount
          ).then(() => {
            message.success("Chuyển khoản thành công");
            destroyModal();
          });
        });
      else {
        setPinErrorMsg("Mã PIN sai rồi");
        setPinStatus("error");
      }
    } else {
      setPinErrorMsg("");
      setPinStatus("");
    }
  }, [pinValue]);
  return (
    <Form>
      <Form.Item
        name="pin"
        hasFeedback
        validateStatus={pinValue?.length < 6 ? "" : pinStatus}
        help={pinValue?.length < 6 ? "" : pinErrorMsg}
      >
        <PinInput
          length={6}
          onChange={(value, index) => {
            setPinValue(value);
          }}
          type="numeric"
          inputMode="number"
          inputFocusStyle={{ borderColor: "blue" }}
        />
      </Form.Item>
    </Form>
  );
};
