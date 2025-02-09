import ChatBubble from "@/Components/ChatBubble";
import useActiveUserList from "@/Hooks/useActiveUserList";
import useChatroom from "@/Hooks/useChatroom";
import useOptimisticChat from "@/Hooks/useOptimisticChat";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import { Button, Sidebar, Textarea } from "flowbite-react";
import { nanoid } from "nanoid";
import { useRef, useEffect } from "react";

export default function Dashboard({ authUser }) {
    const [activeUserList] = useActiveUserList(authUser);
    const { activeChatroom, messages, setMessages, handleCreateChatroom } =
        useChatroom();
    const {
        submit,
        handleMessageChange,
        processing,
        errors,
        data,
        scrollBottomRef,
    } = useOptimisticChat(
        authUser,
        messages,
        setMessages,
        activeChatroom,
        Echo
    );

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
                                                                user.id
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
                                            onChange={handleMessageChange}
                                        />
                                        {errors.contents && (
                                            <div>{errors.content}</div>
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
