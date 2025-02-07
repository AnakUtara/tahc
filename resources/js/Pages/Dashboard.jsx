import ChatBubble from "@/Components/ChatBubble";
import { handleCreateChatroom } from "@/Handlers/handlers";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Sidebar, Textarea } from "flowbite-react";
import { useRef, useEffect, useState } from "react";

export default function Dashboard({ authUser }) {
    const [activeUserList, setActiveUserList] = useState([]);
    const [activeChatroom, setActiveChatroom] = useState(null);
    const [messages, setMessages] = useState([]);
    const { data, setData, post, reset, processing, errors } = useForm({
        content: "",
        user_id: authUser.id,
        chatroom_id: activeChatroom?.id,
    });

    const scrollBottomRef = useRef();

    useEffect(() => {
        scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function submit(e) {
        e.preventDefault();
        post(route("messages.store"));
        reset("content");
    }

    useEffect(() => {
        Echo.join(`active-users`)
            .here((users) => {
                setActiveUserList(users.filter((u) => u.id !== authUser.id));
            })
            .joining((user) => {
                console.log("User Joining:", user.name);
                setActiveUserList((prevList) => [...prevList, user]);
            })
            .leaving((user) => {
                console.log("User Leaving:", user.name);
                setActiveUserList((prevList) =>
                    prevList.filter((u) => u.id !== user.id)
                );
            })
            .error((error) => console.error(error.message));

        if (activeChatroom) {
            Echo.private(`chatroom.${activeChatroom?.id}`).listen(
                "SendChatMessage",
                (e) => {
                    setMessages((prevMessages) => [...prevMessages, e.message]);
                }
            );
        }
        console.log(messages);
        return () => {
            Echo.leave(`active-users`);
            Echo.leave(`chatroom.${activeChatroom?.id}`);
        };
    }, [activeChatroom]);

    return (
        <AuthenticatedLayout>
            <Head title="TAHC" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="flex h-[82vh]">
                            <Sidebar className="h-full overflow-y-auto">
                                <Sidebar.Items>
                                    <Sidebar.ItemGroup>
                                        <div className="prose">
                                            <h3 className="mb-0 text-gray-900">
                                                Welcome {authUser.name}!
                                            </h3>
                                            <p className="mb-4 text-sm text-gray-900">
                                                Find your anonymous person to
                                                chat with:
                                            </p>
                                        </div>
                                    </Sidebar.ItemGroup>
                                    <Sidebar.ItemGroup>
                                        {activeUserList.length > 0 &&
                                            activeUserList.map((user) => (
                                                <Sidebar.Item key={user.id}>
                                                    <div
                                                        className="prose text-left"
                                                        onClick={() =>
                                                            handleCreateChatroom(
                                                                user.id,
                                                                setActiveChatroom
                                                            )
                                                        }
                                                    >
                                                        <h2 className="m-0">
                                                            {user.name}
                                                        </h2>
                                                        <p className="text-sm">
                                                            Online
                                                        </p>
                                                    </div>
                                                </Sidebar.Item>
                                            ))}
                                    </Sidebar.ItemGroup>
                                </Sidebar.Items>
                            </Sidebar>
                            {activeChatroom && (
                                <div className="flex-1 p-4 size-full">
                                    <div className="prose h-[80%] max-w-full">
                                        <h3 className="mb-0 text-gray-900">
                                            Chatroom:{" "}
                                            {activeChatroom.users
                                                .map((user) => user.name)
                                                .join(" & ")}
                                        </h3>
                                        <p className="mb-4 text-sm text-gray-900">
                                            Chat with your anonymous human!
                                        </p>
                                        <div className="h-[80%] overflow-y-auto pr-3">
                                            {activeChatroom.messages.map(
                                                (message) => (
                                                    <ChatBubble
                                                        key={message.id}
                                                        message={message}
                                                        authUser={authUser}
                                                    />
                                                )
                                            )}
                                            {messages.map((message) => (
                                                <ChatBubble
                                                    key={message.id}
                                                    message={message}
                                                    authUser={authUser}
                                                />
                                            ))}
                                            <div ref={scrollBottomRef} />
                                        </div>
                                    </div>
                                    <form
                                        onSubmit={submit}
                                        className="h-[20%] flex gap-2"
                                    >
                                        <Textarea
                                            id="contents"
                                            name="contents"
                                            rows={4}
                                            placeholder="Your message..."
                                            value={data.content}
                                            onChange={(e) => {
                                                setData(
                                                    "content",
                                                    e.target.value
                                                );
                                                setData(
                                                    "chatroom_id",
                                                    activeChatroom?.id
                                                );
                                            }}
                                        />
                                        {errors.contents && (
                                            <div>{errors.contents}</div>
                                        )}
                                        <Button
                                            size="lg"
                                            className="items-center"
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Send
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
