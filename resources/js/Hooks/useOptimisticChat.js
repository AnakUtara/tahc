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
        //Set chatroom_id to form data if activeChatroom exists
        if (activeChatroom) setData("chatroom_id", activeChatroom.id);
        //Scroll to bottom of messages list
        scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, activeChatroom]);

    async function submit(e) {
        e.preventDefault();
        //Generate temporary nanoid
        const tempID = `temp-${nanoid(10)}`;
        //Include tempID in form data
        data.tempID = tempID;
        // Optimistic message temp data
        const optimisticMessage = {
            id: tempID,
            content: data.content,
            user_id: authUser.id,
            sender: { id: authUser.id, name: authUser.name },
            chatroom_id: activeChatroom.id,
            optimistic: true,
            created_at: new Date().toISOString(),
        };
        //Set optimistic message to messages list
        setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
        try {
            //Send message to server & awaiting response
            const res = await axios.post(route("messages.store"), data, {
                headers: {
                    Accept: "application/json",
                    //Echo socket id to identify socket request origin
                    "X-Socket-Id": Echo.socketId(),
                },
            });
            const message = res.data;
            //Replace optimistic message with actual message from server
            setMessages((prevMessages) =>
                prevMessages.map((m) =>
                    m.tempID === message.tempID ? message : m
                )
            );
        } catch (error) {
            console.error(error.message);
            //Remove optimistic message from messages list on error
            setMessages((prevMessages) =>
                prevMessages.filter(
                    (m) => m.tempID !== optimisticMessage.tempID
                )
            );
        }
        reset("content");
    }

    function handleMessageChange(e) {
        const data = e.target.value;
        setData("content", data);
        //Send typing event whisper to private channel if form data has content
        if (data) {
            Echo.private(`chatroom.${activeChatroom?.id}`).whisper("typing", {
                id: authUser.id,
                name: authUser.name,
                typing: true,
            });
        }
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
