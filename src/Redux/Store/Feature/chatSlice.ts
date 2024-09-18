/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Http from "../../../lib/Http";
import ChatRoom from "@/Pages/ChatRoom";
import { selectAuth } from "./authSlice";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface Chat {
  id: number;
  chat_name: string;
  chat_type: string;
  Members: User;
}

interface ChatRoom {
  id: number;
  chat_id: number;
  Chat: Chat;
}

export interface Message {
  id: number;
  chat_id: number;
  sender_id: number;
  content: string;
  message_type: string;
  send_at: string; // ISO 8601 date string
  is_read: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  User: User;
}

interface ChatRoomState {
  chatRooms: ChatRoom[];
  chatRoom: ChatRoom | null;
  messages: Message[];
  error: string | null | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  send_message_status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ChatRoomState = {
  chatRooms: [],
  chatRoom: null,
  error: null,
  status: "idle",
  messages: [],
  send_message_status: "idle",
};

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    setChatRooms(state, action: PayloadAction<ChatRoom[]>) {
      state.chatRooms = action.payload;
      state.status = "succeeded";
    },
    setChatRoom(state, action: PayloadAction<ChatRoom | null>) {
      state.chatRoom = action.payload;
      state.status = "succeeded";
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = "failed";
    },
    setStatus(
      state,
      action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">
    ) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChatRooms.fulfilled, (state, action) => {
        state.chatRooms = action.payload;
        state.status = "succeeded";
      })
      .addCase(getChatRooms.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(getMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.status = "succeeded";
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(sendMessage.pending, (state) => {
        state.send_message_status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.send_message_status = "succeeded";
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.error.message;
        state.send_message_status = "failed";
      });
  },
});

export const { setChatRooms, setChatRoom, setError, setStatus } =
  chatRoomSlice.actions;

export const getChatRooms = createAsyncThunk(
  "chatRoom/fetchChatRooms",
  async (_, thunkAPI) => {
    try {
      const http = new Http(import.meta.env.VITE_BASE_URL);
      const auth = selectAuth(thunkAPI.getState() as RootState);
      const token = auth.user?.token;
      console.log(auth);
      const response: {
        data: {
          data: ChatRoom[];
        };
      } = await http.get("/api/v1/chat", {
        headers: {
          Authorization: token,
        },
      });

      console.log(response);
      return response.data.data as ChatRoom[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error?.message;
    }
  }
);

export const getMessages = createAsyncThunk(
  "chatRoom/fetchMessages",
  async (chatId: number, thunkAPI) => {
    try {
      const http = new Http(import.meta.env.VITE_BASE_URL);
      const auth = selectAuth(thunkAPI.getState() as RootState);
      const token = auth.user?.token;
      const response: { data: { data: Message[] } } = await http.get(
        `/api/v1/chat/${chatId}/messages`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data.data as Message[];
    } catch (error: any) {
      throw error?.message;
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chatRoom/sendMessage",
  async (message: { chatId: number; content: string }, thunkAPI) => {
    try {
      const http = new Http(import.meta.env.VITE_BASE_URL);
      const auth = selectAuth(thunkAPI.getState() as RootState);
      const token = auth.user?.token;
      const response: {
        data: {
          data: any;
        };
      } = await http.post(
        `/api/v1/chat/send`,
        {
          chatId: message.chatId,
          content: message.content,
          type: "TEXT",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      throw error?.message;
    }
  }
);

export default chatRoomSlice.reducer;
