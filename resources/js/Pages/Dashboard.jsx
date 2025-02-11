import ActiveUsersSidebar from "@/Components/ActiveUsersSidebar";
import ChatBubble from "@/Components/ChatBubble";
import useActiveUserList from "@/Hooks/useActiveUserList";
import useChatNotification from "@/Hooks/useChatNotification";
import useChatroom from "@/Hooks/useChatroom";
import useOptimisticChat from "@/Hooks/useOptimisticChat";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button, Drawer, Textarea } from "flowbite-react";
import { useState } from "react";
import { FaAddressBook } from "react-icons/fa6";

export default function Dashboard({ authUser }) {
    //active user list hook
    const [activeUserList] = useActiveUserList(authUser);

    const {
        activeChatroom,
        messages,
        setMessages,
        handleCreateChatroom,
        typingUsers,
    } = useChatroom();

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

    const [isOpen, setIsOpen] = useState(false);

    function handleClose() {
        setIsOpen(false);
    }

    useChatNotification(activeChatroom, authUser);

    return (
        <AuthenticatedLayout>
            <Head title="TAHC" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Button
                        className="absolute right-0 top-[4.5rem] drop-shadow-md rounded-se-none rounded-ee-none sm:hidden"
                        color="dark"
                        onClick={() => setIsOpen(true)}
                    >
                        <FaAddressBook className="size-6" />
                    </Button>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="flex h-[82vh]">
                            <Drawer
                                className="w-fit"
                                open={isOpen}
                                onClose={handleClose}
                            >
                                <Drawer.Items>
                                    <ActiveUsersSidebar
                                        {...{
                                            authUser,
                                            activeUserList,
                                            handleCreateChatroom,
                                        }}
                                        hidden={false}
                                    />
                                </Drawer.Items>
                            </Drawer>
                            <ActiveUsersSidebar
                                {...{
                                    authUser,
                                    activeUserList,
                                    handleCreateChatroom,
                                }}
                            />
                            <div className="flex-1 p-4 size-full">
                                {activeChatroom ? (
                                    <>
                                        <div className="prose h-[78%] max-w-full">
                                            <h3 className="mb-0 text-gray-900">
                                                Chatroom:{" "}
                                                {activeChatroom.users
                                                    .map((user) => user.name)
                                                    .join(" & ")}
                                            </h3>
                                            <p className="mb-4 text-sm text-gray-900">
                                                Chat with your anonymous human!
                                            </p>
                                            <div className="h-[350px] pr-3 overflow-y-auto [&>div:nth-last-child(2)]:mb-0">
                                                {activeChatroom.messages.map(
                                                    (message) => (
                                                        <ChatBubble
                                                            key={message.id}
                                                            {...{
                                                                message,
                                                                authUser,
                                                            }}
                                                        />
                                                    )
                                                )}
                                                {messages.map((message) => (
                                                    <ChatBubble
                                                        key={message.id}
                                                        {...{
                                                            message,
                                                            authUser,
                                                        }}
                                                    />
                                                ))}
                                                <div ref={scrollBottomRef} />
                                            </div>
                                        </div>
                                        <div className="h-[22%]">
                                            <form
                                                onSubmit={submit}
                                                className="flex flex-col gap-2"
                                            >
                                                <Textarea
                                                    id="contents"
                                                    name="contents"
                                                    rows={2}
                                                    placeholder="Your message..."
                                                    value={data.content}
                                                    onChange={
                                                        handleMessageChange
                                                    }
                                                />
                                                <Button
                                                    className="items-center"
                                                    type="submit"
                                                    disabled={processing}
                                                    color="dark"
                                                >
                                                    Send
                                                </Button>
                                                {
                                                    //Error text
                                                }
                                                {errors.contents && (
                                                    <p className="text-xs text-red-600">
                                                        *{errors.content}
                                                    </p>
                                                )}
                                                {
                                                    //Typing indicator
                                                }
                                                {Object.keys(typingUsers)
                                                    .length > 0 && (
                                                    <p className="text-xs">
                                                        <strong>
                                                            {Object.keys(
                                                                typingUsers
                                                            )
                                                                .join(
                                                                    Object.keys(
                                                                        typingUsers
                                                                    ).length > 1
                                                                        ? ", "
                                                                        : " "
                                                                )
                                                                .replaceAll(
                                                                    /[0-9]-/g,
                                                                    ""
                                                                )}
                                                        </strong>
                                                        {Object.keys(
                                                            typingUsers
                                                        ).length > 1
                                                            ? " are "
                                                            : " is "}{" "}
                                                        typing...
                                                    </p>
                                                )}
                                            </form>
                                        </div>
                                    </>
                                ) : (
                                    <center className="grid h-full place-items-center">
                                        Select anyone from the list to start a
                                        chat
                                    </center>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
