import { useEffect, useRef, useState } from "react";

export default function useChatroom() {
    const [activeChatroom, setActiveChatroom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [typingUsers, setTypingUsers] = useState({});
    const typingTimers = useRef({});

    useEffect(() => {
        if (activeChatroom) {
            const channel = Echo.private(`chatroom.${activeChatroom?.id}`);
            channel.listen("SendChatMessage", (e) => {
                setMessages((prevMessages) => [...prevMessages, e.message]);
            });
            channel.listenForWhisper("typing", ({ id, name, typing }) => {
                const key = `${id}-${name}`;
                if (typing) {
                    // Update state to mark the user as typing
                    setTypingUsers((prev) => ({ ...prev, [key]: typing }));
                    // Clear any existing timer for this user
                    if (typingTimers.current[key])
                        clearTimeout(typingTimers.current[key]);
                    // Set a new timer to remove the typing indicator after 3 seconds
                    typingTimers.current[key] = setTimeout(() => {
                        setTypingUsers((prev) => {
                            const newState = { ...prev };
                            delete newState[key];
                            return newState;
                        });
                        delete typingTimers.current[key];
                    }, 3000);
                }
            });
        }
        return () => {
            Echo.leave(`chatroom.${activeChatroom?.id}`);
            Object.values(typingTimers.current).forEach((timer) =>
                clearTimeout(timer)
            );
            typingTimers.current = {};
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

    return {
        activeChatroom,
        messages,
        setMessages,
        handleCreateChatroom,
        typingUsers,
    };
}
