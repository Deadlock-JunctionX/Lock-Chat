import { Button, Form, Input, Modal } from "antd";
import { User } from "firebase/auth";
import React, { useState } from "react";
import { SendMoneyIntention, SendMoneyIntentionType } from "../../shared/types";
import { MoneyTransaction } from "../Transaction/MoneyTransaction";

export interface ReplyWrapperProps {
  intent: SendMoneyIntention;
  children?: React.ReactChild;
  setAmount: (value: number | string | undefined) => void;
  showModal: () => void;
  verify: boolean;
}

export const ReplyWrapper = (props: ReplyWrapperProps) => {
  const intent = props.intent;
  return props.verify ? (
    <div>
      {props.children} <hr className="my-1" />
      <button
        className="p-2"
        onClick={() => {
          props.showModal();
          props.setAmount(intent.money);
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
    <Modal centered open={props.visible} onCancel={props.onClose} footer={null}>
      <MoneyTransaction
        destroyModal={props.onClose}
        amount={props.amount}
        otherUser={props.otherUser}
      />
    </Modal>
  );
};
