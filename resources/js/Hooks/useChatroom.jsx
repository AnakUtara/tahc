import { useEffect, useState } from "react";

export default function useChatroom() {
    const [activeChatroom, setActiveChatroom] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (activeChatroom) {
            Echo.private(`chatroom.${activeChatroom?.id}`).listen(
                "SendChatMessage",
                (e) => {
                    setMessages((prevMessages) => [...prevMessages, e.message]);
                }
            );
        }
        return () => {
            Echo.leave(`chatroom.${activeChatroom?.id}`);
        };
    }, [activeChatroom]);

    async function handleCreateChatroom(userId) {
        setMessages([]);
        try {
            const res = await axios.post(
                `/chatrooms`,
                { user_id: userId },
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
            const chatroom = res.data;
            setActiveChatroom(chatroom);
        } catch (error) {
            console.error(error.response.data.message);
        }
    }

    return { activeChatroom, messages, setMessages, handleCreateChatroom };
}
