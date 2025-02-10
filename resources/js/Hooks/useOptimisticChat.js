import { useForm } from "@inertiajs/react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";

export default function useOptimisticChat(
    authUser,
    messages,
    setMessages,
    activeChatroom,
    Echo
) {
    const scrollBottomRef = useRef();
    const initFormData = {
        tempID: "",
        content: "",
        user_id: authUser.id,
        chatroom_id: activeChatroom?.id,
    };
    const { data, setData, reset, processing, errors } = useForm(initFormData);

    useEffect(() => {
        if (activeChatroom) setData("chatroom_id", activeChatroom.id);
        scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, activeChatroom]);

    async function submit(e) {
        e.preventDefault();
        const tempID = `temp-${nanoid(10)}`;
        data.tempID = tempID;
        const optimisticMessage = {
            id: tempID,
            content: data.content,
            user_id: authUser.id,
            sender: { id: authUser.id, name: authUser.name },
            chatroom_id: activeChatroom.id,
            optimistic: true,
            created_at: new Date().toISOString(),
        };
        setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
        try {
            const res = await axios.post(route("messages.store"), data, {
                headers: {
                    Accept: "application/json",
                    "X-Socket-Id": Echo.socketId(),
                },
            });
            const message = res.data;
            setMessages((prevMessages) =>
                prevMessages.map((m) =>
                    m.tempID === message.tempID ? message : m
                )
            );
        } catch (error) {
            console.error(error.message);
            setMessages((prevMessages) =>
                prevMessages.filter(
                    (m) => m.tempID !== optimisticMessage.tempID
                )
            );
        }
        reset("content");
    }

    function handleMessageChange(e) {
        setData("content", e.target.value);
    }

    return {
        submit,
        handleMessageChange,
        scrollBottomRef,
        processing,
        errors,
        data,
    };
}
