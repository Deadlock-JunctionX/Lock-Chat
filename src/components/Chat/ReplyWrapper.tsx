import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { SendMoneyIntention } from "../../shared/types";

export interface ReplyWrapperProps {
  intent: SendMoneyIntention;
  children?: React.ReactChild;
}

export const ReplyWrapper = (props: ReplyWrapperProps) => {
  const intent = props.intent;
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  return intent ? (
    <div>
      {props.children} <hr />{" "}
      <span onClick={() => {setModalVisible(true)}}>
        <strong>Chuyển tiền</strong>
        <SendMoneyForm visible={modalVisible} onClose={() => {setModalVisible(false)}}/>
      </span>
    </div>
  ) : (
    <>{props.children}</>
  );
};

export const SendMoneyForm = (props: any) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal open={props.visible} onCancel={props.onClose} footer={[<Button type="primary" onClick={props.onClose}>Close</Button>]}>
      <Form
        name="basic"
        style={{ maxWidth: 600, marginTop: "2rem" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
