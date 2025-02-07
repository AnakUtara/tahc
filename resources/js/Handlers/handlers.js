import axios from "axios";

export async function handleCreateChatroom(userId, setActiveChatroom) {
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
