import {
  SmileOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  FormInstance,
  Input,
  message,
  Result,
  Steps,
  theme,
} from "antd";
import { ValidateStatus } from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { getUserAccount, impersonateUser, submitTransaction } from "./api";
import PinInput from "react-pin-input";
import { User } from "firebase/auth";
import React from "react";
import BankSelection from "./BankSelection";

export interface MoneyTransactionProp {
  otherUser?: User;
}
const validateStep = (
  firstCondition: boolean,
  secCondition: boolean,
  step: number
) => {
  return (firstCondition && step === 0) || (secCondition && step === 1);
};

export const MoneyTransaction = (props: MoneyTransactionProp) => {
  const [firstCondition, setFirstCondition] = useState<boolean>(false);
  const [secCondition, setSecCondition] = useState<boolean>(false);

  const steps = [
    {
      title: "Thông tin chuyển tiền",
      content: (
        <MoneyTransactionForm
          setStatus={(value: boolean) => setFirstCondition(value)}
          otherUser={props.otherUser}
        />
      ),
    },
    {
      title: "Nhập mã pin",
      content: (
        <MoneyTransactionPinConfirm
          setStatus={(value: boolean) => setSecCondition(value)}
        />
      ),
    },
    {
      title: "Kết quả",
      content: <MoneyTransactionSuccess />,
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

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
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button
            shape="round"
            icon={<VerticalRightOutlined />}
            onClick={() => prev()}
          />
        )}
        {current < steps.length - 1 && (
          <Button
            shape="round"
            icon={<VerticalLeftOutlined />}
            onClick={() => next()}
          />
        )}
        {current === steps.length - 1 && (
          <Button
            shape="round"
            icon={<VerticalLeftOutlined />}
            onClick={() => message.success("Processing complete!")}
          />
        )}
      </div>
    </div>
  );
};

const MoneyTransactionForm = ({
  setUserAccountInfo,
  setStatus,
  otherUser,
}: any) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  console.log("Other User", otherUser);
  const form = React.useRef<FormInstance>(null);
  useEffect(() => {
    form.current?.setFieldsValue({
      name: otherUser?.displayName,
      bankNumber: otherUser?.phoneNumber,
    });
  }, [otherUser]);

  return (
    <Form
      ref={form}
      name="send-money-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onSubmitCapture={() => {
        getUserAccount("").then((data) => {
          setUserAccountInfo(data);
          setStatus(true);
        });
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Nhập họ tên của người nhận" }]}
      >
        <Input />
      </Form.Item>

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
        <Input bordered={false} />
      </Form.Item>
    </Form>
  );
};

const MoneyTransactionPinConfirm = ({ setStatus }: any) => {
  const [pinValue, setPinValue] = useState<string>("");
  const [pinStatus, setPinStatus] = useState<ValidateStatus>();
  const [pinErrorMsg, setPinErrorMsg] = useState<string>();

  const validatePin = (pin: string) => {
    return pin === "123456";
  };
  useEffect(() => {
    if (pinValue.length === 6) {
      if (validatePin(pinValue))
        impersonateUser("").then((data) => {
          // submitTransaction(data).then(() => {
          //   setPinStatus("success");
          //   setStatus(true);
          // });
        });
      else {
        setPinErrorMsg("Mã PIN sai rồi");
        setPinStatus("error");
        setStatus(false);
      }
    } else {
      setPinErrorMsg("");
      setPinStatus("");
      setStatus(false);
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
          secret
          onChange={(value, index) => {
            setPinValue(value);
          }}
          type="numeric"
          inputMode="number"
        />
      </Form.Item>
    </Form>
  );
};

const MoneyTransactionSuccess = () => {
  return (
    <Result
      style={{ maxHeight: "380px" }}
      icon={<SmileOutlined style={{ fontSize: "48px" }} />}
      title="Great, we have done all the operations!"
    />
  );
};
