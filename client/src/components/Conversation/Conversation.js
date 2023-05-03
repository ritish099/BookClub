import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser);
        console.log(friendId);
        const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}auth/${friendId}`;
        console.log(url);

        axios.get(url).then((res) => {
            setUser(res.data);
        }).catch(err => {
            console.log(err);
        });

    }, [currentUser, conversation]);

    return (
        <div className="conversation" >
            <img
                className="conversationImg"
                src={
                    // user?.profilePicture
                    //     ? PF + user.profilePicture
                    //     : PF + "person/noAvatar.png"
                    `https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ`
                }
                alt=""
            />
            <span className="conversationName">{user?.name}</span>
        </div>
    );
}