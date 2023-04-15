import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { SendMoneyIntention, SendMoneyIntentionType } from "../../shared/types";

export interface ReplyWrapperProps {
  intent: SendMoneyIntention;
  children?: React.ReactChild;
  showModal: () => void;
}

export const ReplyWrapper = (props: ReplyWrapperProps) => {
  const intent = props.intent;
  return intent && intent.type === SendMoneyIntentionType.SEND ? (
    <div>
      {props.children} <hr className="my-1" />
      <button
        className="p-2"
        onClick={() => {
          props.showModal();
        }}
      >
        <strong>Chuyển tiền</strong>
      </button>
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
    <Modal
      open={props.visible}
      onCancel={props.onClose}
      footer={[
        <Button type="ghost" onClick={props.onClose}>
          Đóng
        </Button>,
        <Button type="primary" danger>
          Chuyển tiền
        </Button>
      ]}
    >
      <Form
        name="send-money-form"
        style={{ marginTop: "2rem" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
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
    </Modal>
  );
};
