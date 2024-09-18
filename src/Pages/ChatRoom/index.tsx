/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Send, Menu, Paperclip, X } from "lucide-react";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store/store";
import {
  getChatRooms,
  getMessages,
  sendMessage,
  User,
} from "@/Redux/Store/Feature/chatSlice";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { logout } from "@/Redux/Store/Feature/authSlice";
import Loading from "@/Components/Loading";
import moment from "moment";
import { socket } from "@/lib/Socket";
import SoundPlay from "@/lib/SoundPlay";

interface Member {
  id: number;
  chat_id: number;
  user_id: number;
  User: User;
}

export default function ChatRoom() {
  const chatRooms = useSelector((state: RootState) => state.chatRoom.chatRooms);
  const dispatch = useDispatch();
  const UserState = useSelector((state: RootState) => state.auth.user);
  const status = useSelector((state: RootState) => state.chatRoom.status);
  const messages = useSelector((state: RootState) => state.chatRoom.messages);
  const messages_status = useSelector(
    (state: RootState) => state.chatRoom.send_message_status
  );
  const [RoomChat, setRoomChat] = useState<null | {
    id: number;
    chat_id: number;
  }>(null);

  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollEnd = useRef<HTMLDivElement>(null);
  const [contact, setContact] = useState<null | {
    name: string;
  }>(null);

  const { playSound } = SoundPlay(
    "https://cdn.pixabay.com/audio/2022/12/12/audio_e6f0105ae1.mp3"
  );

  const loadRooms = async () => {
    const rooms = await dispatch(getChatRooms() as unknown as AnyAction);
    console.log(rooms);
  };

  const handleGetMessage = async (_id: number) => {
    const message = await dispatch(getMessages(_id) as unknown as AnyAction);
    setRoomChat({
      id: _id,
      chat_id: _id,
    });

    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    socket.on("newMessage", (message: { sender_id: number }) => {
      console.log(message, "new msg");
      if (message.sender_id !== UserState?.id) {
        playSound();
      }
      handleGetMessage(RoomChat?.chat_id as number);
    });
    return () => {
      socket.removeAllListeners();
      console.log("remove listener");
    };
  }, [RoomChat]);

  const handleSendMessage = async () => {
    if (newMessage.length >= 1) {
      await dispatch(
        sendMessage({
          chatId: RoomChat?.chat_id as number,
          content: newMessage,
        }) as unknown as AnyAction
      );
    }
    setNewMessage("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const getTheReciever = (member: Member[]) => {
    const receiver = member.find((member) => member.user_id !== UserState?.id);
    console.log("reciever name");
    return receiver?.User.name;
  };

  const getSender = (_id: number) => {
    if (_id == UserState?.id) {
      return "You";
    }
    return "Sender";
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 w-[100vw]">
      {/* Glassmorphism container */}
      <div className="flex w-full h-full p-0 md:p-0 backdrop-blur-xl bg-white/30 rounded-3xl shadow-2xl">
        {/* Sidebar */}
        <Card
          className={`w-80 rounded-none flex-shrink-0 bg-white/10 backdrop-blur-md border-r border-white/20 rounded-l-3xl overflow-hidden ${
            isSidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          {status == "succeeded" ? (
            <>
              <div className="p-4 border-b border-white/20">
                <h2 className="text-xl font-bold text-white">Chats</h2>
              </div>
              <ScrollArea className="h-[calc(100vh-8rem)] relative">
                {chatRooms.map((chat) => (
                  <div
                    onClick={() => {
                      handleGetMessage(chat.chat_id);
                      const name = getTheReciever(
                        chat.Chat.Members as unknown as Member[]
                      );
                      setContact({
                        name: name as string,
                      });
                    }}
                    key={chat.id}
                    className="p-4 border-b border-white/10 hover:bg-white/50 cursor-pointer transition duration-200"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${getTheReciever(
                            chat.Chat.Members as unknown as Member[]
                          )}`}
                        />
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="font-semibold text-white">
                          {getTheReciever(
                            chat.Chat.Members as unknown as Member[]
                          )}
                        </p>
                        {/* <p className="text-sm text-white/70">{chat.lastMessage}</p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex absolute left-0 right-0 py-8 px-4 bg-white bottom-0">
                <Button
                  onClick={() => {
                    dispatch(logout());
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <Loading isLoading></Loading>
          )}
        </Card>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white/40 backdrop-blur-md rounded-r-3xl overflow-hidden">
          {/* Chat Header */}
          <Card className="p-4 flex items-center justify-between bg-white/20 backdrop-blur-md border-b border-white/20">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2 text-white hover:bg-white/20"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu />
              </Button>
              {RoomChat ? (
                <>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${contact?.name}`}
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <h2 className="ml-4 text-xl font-bold text-white">
                    {contact?.name}
                  </h2>
                </>
              ) : null}
            </div>
          </Card>

          {/* Messages */}
          {RoomChat ? (
            <ScrollArea className="flex-1 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    getSender(message.sender_id) === "You"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg backdrop-blur-md ${
                      getSender(message.sender_id) === "You"
                        ? "bg-blue-500/70 text-white"
                        : "bg-white/50 text-gray-800"
                    }`}
                  >
                    {message.message_type == "FILE" && (
                      <img
                        src={message.content}
                        alt="Shared media"
                        className="max-w-full h-auto rounded-lg mb-2"
                      />
                    )}
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {moment(message.send_at).fromNow()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={scrollEnd} className=""></div>
            </ScrollArea>
          ) : (
            <ScrollArea className="flex-1 p-4"></ScrollArea>
          )}

          {/* Message Input */}
          <Card className="p-4 bg-white/30 backdrop-blur-md border-t border-white/20">
            {selectedFile && (
              <div className="mb-2 p-2 bg-white/40 backdrop-blur-sm rounded-lg flex items-center justify-between">
                <span className="text-sm truncate text-gray-800">
                  {selectedFile.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-800 hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 mr-2 bg-white/50 backdrop-blur-sm border-white/30 text-gray-800 placeholder-gray-500"
              />
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,video/*"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={triggerFileInput}
                className="mr-2 bg-white/50 backdrop-blur-sm border-white/30 text-gray-800 hover:bg-white/70"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                className="bg-blue-500/70 hover:bg-blue-600/70 text-white"
              >
                {messages_status == "loading" ? (
                  <l-ring-2
                    size="20"
                    stroke="5"
                    stroke-length="0.25"
                    bg-opacity="0.1"
                    speed="0.8"
                    color="black"
                  ></l-ring-2>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
