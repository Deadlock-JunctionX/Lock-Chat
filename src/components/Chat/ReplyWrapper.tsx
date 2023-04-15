import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { SendMoneyIntention, SendMoneyIntentionType } from "../../shared/types";
import { MoneyTransaction } from "../Transaction/MoneyTransaction";

export interface ReplyWrapperProps {
  intent: SendMoneyIntention;
  children?: React.ReactChild;
  showModal: () => void;
}

export const ReplyWrapper = (props: ReplyWrapperProps) => {
  const intent = props.intent;
  return true ? (
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
  return (
    <Modal
      open={props.visible}
      footer={null}
    >
      <MoneyTransaction />
    </Modal>
  );
};
