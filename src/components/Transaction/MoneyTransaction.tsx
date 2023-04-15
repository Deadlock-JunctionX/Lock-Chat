import { SmileOutlined, VerticalRightOutlined, VerticalLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Result, Steps, theme } from "antd";
import { useEffect, useState } from "react";
import BankSelection from "./BankSelection";

export interface MoneyTransactionProp { }

export const MoneyTransaction = (props: MoneyTransactionProp) => {
  const steps = [
    {
      title: "Thông tin chuyển tiền",
      content: <MoneyTransactionForm />,
    },
    {
      title: "Nhập mã pin",
      content: <MoneyTransactionPinConfirm />,
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
          <Button  shape="round" icon={<VerticalRightOutlined />} onClick={()=>prev()}/>
        )}
        {current < steps.length - 1 && (
          <Button  shape="round" icon={<VerticalLeftOutlined />} onClick={()=>next()}/>
        )}
        {current === steps.length - 1 && (
          <Button shape="round" icon={<VerticalLeftOutlined />} onClick={() => message.success("Processing complete!")}/>
        )}
      </div>
    </div>
  );
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const MoneyTransactionForm = ({ setUserAccountInfo }: any) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getUserAccount = async (data: any): Promise<string> => "{}";

  return (
    <Form
      name="send-money-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onSubmitCapture={() => {
        getUserAccount("").then((data) => {
          setUserAccountInfo(data);
        });
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
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
        name="stk"
        rules={[{ required: true, message: "Please input your STK" }]}
      >
        <Input bordered={false} />
      </Form.Item>
    </Form>
  );
};

const MoneyTransactionPinConfirm = () => {
  const [pinValue, setPinValue] = useState<string>();
  const impersonateUser = async (data: any): Promise<string> => "{}";
  const submitTransaction = async (data: any): Promise<string> => "{}";
  useEffect(() => {
    if (pinValue?.length === 4) {
    }
  }, [pinValue]);
  return (
    <div>
      <Input
        className="pin-input"
        placeholder="Nhập mã PIN"
        value={pinValue}
        onChange={(e) => {
          setPinValue(e.target.value);
        }}
      />
    </div>
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
