import React, { useContext, useState } from 'react';
import './componentsStyle.css';
import { AuthContext } from '../context/AuthContext.js';
import { get, post } from '../services/ApiEndpoint.js';
// import { format } from 'timeago.js';

export default function Chat({ chats }) {
    const [chat, setChat] = useState(null);
    const { currentUser } = useContext(AuthContext);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await get(`/api/chats/getchat/${id}`);
            setChat({ ...res.data, receiver });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get('text');
        if (!text) return;
        try {
            const res = await post(`/api/messages/addMessage/${chat._id}`, { text });
            setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="messages">
                <h1>Messages</h1>
                {chats?.map((c) => (
                    <div
                        className="message"
                        key={c._id}
                        style={{
                            backgroundColor: c.seenBy.includes(currentUser._id) ? 'white' : '#fece51',
                        }}
                        onClick={() => handleOpenChat(c._id, c.receiver)}
                    >
                        <img src={c.receiver.avatar || "images/user.jpg"} alt="" />
                        <span>{c.last}</span>
                        <p>{c.lastMessage}</p>
                    </div>
                ))}
            </div>
            {chat && (
                <div className="chatBox">
                    <div className="top">
                        <div className="user1">
                            <img src={chat.receiver.avatar || "images/user.jpg"} alt="" />
                            <span>{chat.receiver.username}</span>
                            <h1 className="close1" onClick={() => setChat(null)}>X</h1>
                        </div>
                    </div>
                    <div className="center">
                        {chat.messages.map((message) => (
                            <div
                                key={message._id}
                                className="chatMessage"
                                style={{
                                    alignSelf: message.userId === currentUser._id ? 'flex-end' : 'flex-start',
                                    textAlign: message.userId === currentUser._id ? 'right' : 'left',
                                }}
                            >
                                <p>{message.text}</p>
                                {/* <span>{format(message.createdAt)}</span> */}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="bottom">
                        <textarea name="text"></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}
