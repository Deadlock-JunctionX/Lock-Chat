import { User } from "firebase/auth";
export interface ConversationInfo {
  users: string[];
  group?: {
    admins: string[];
    groupName: null | string;
    groupImage: null | string;
  };

  seen: {
    [key: string]: string;
  };
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  theme: string;
}

export interface SavedUser {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string;
  phoneNumber: string | null;
}

export enum SendMoneyIntentionType {
  SEND = "PAYBACK",
  RECEIVE = "LENDING",
  NOTHING = "",
}

export type SendMoneyIntentionResponse = {
  intent: SendMoneyIntentionType
  amount: number[]
}

export type SendMoneyIntention = {
  user?: User | null;
  money?: string;
  type?: SendMoneyIntentionType;
};

export interface MessageItem {
  id?: string;
  sender: string;
  content: string;
  replyTo?: string;
  file?: {
    name: string;
    size: number;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  type: "text" | "image" | "file" | "sticker" | "removed";
  reactions: {
    [key: string]: number;
  };
  intent: SendMoneyIntentionResponse;
  intentVisible: boolean
}

export interface StickerCollection {
  name: string;
  thumbnail: string;
  icon: string;
  id: string;
  stickers: {
    id: string;
    spriteURL: string;
  }[];
}

export type StickerCollections = StickerCollection[];
