import { SmileOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Result, Steps, theme } from "antd";
import { useEffect, useState } from "react";
import { SendMoneyForm } from "../Chat/ReplyWrapper";

export interface MoneyTransactionProp {}

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
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
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
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
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
        label="Bank"
        name="bank"
        rules={[{ required: true, message: "Please input your bank!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="STK"
        name="stk"
        rules={[{ required: true, message: "Please input your STK" }]}
      >
        <Input />
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
