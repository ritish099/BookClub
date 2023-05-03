import "./Messenger.css";
import Navbar from "../../components/Navbar";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {io} from "socket.io-client";
import verifySignIn from "../../utils/verifySignIn";
import InfoPage from "../../components/InfoPage";
import { useLocation } from "react-router-dom";

export default function Messenger() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  //const {user} = useContext(AuthContext);
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  // const [name, setName] = useState(null);
  // const [token, setToken] = useState(null);
  // const [userName, setUserName] = useState(null);
  // const [email, setEmail] = useState(null);

  const url = `${process.env.REACT_APP_WEB_SOCKET_URL}`;

  const scrollRef = useRef();
  const socket = useRef(io(url));
  const location = useLocation();

  // useEffect(() => {
  //   console.log("Component loaded");
  //   console.log("hello", location);
  // }, []);

  useEffect(() => {
    console.log("changed location...");
  }, [location.pathname])

  //to make sure if a user is logged in
  useEffect(() => {
    verifySignIn().then((res) => {
      setisLoggedIn(res);
    });
  }, []);

  //to fetch all conversations of signed-in user
  useEffect(() => {
    async function fetchConversations() {
      const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}conversations/${userId}`;
      const res = await axios.get(url);
      setConversations(res.data);
    }
    fetchConversations();
  }, []);

  function incomingMessage(data){
    console.log(data);
    console.log(arrivalMessage);

    console.log(setArrivalMessage);

    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  }

  //setting up socket connection
  useEffect(() => {
    //socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      incomingMessage(data);
    });
  }, []);

  useEffect(() => {
    setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     user.followings.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  }, [userId]);

  /*useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + userId);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);*/

  //get all messages of current conversation
  useEffect(() => {
    const getMessages = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}messages/${currentChat?._id}`;
        const res = await axios.get(url);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  //chat sending
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userId
    );

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
      conversationId: currentChat._id
    });

    try {
      const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}messages`;
      const res = await axios.post(url, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  return isLoggedIn ? (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
          <h5>Your Conversations : </h5>
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={userId} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === userId} />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
      {/* <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline
            onlineUsers={onlineUsers}
             currentId={userId}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div> */}
    </div>
  ) : (
    <InfoPage message="You have to be logged in to access this page" />
  );
}
