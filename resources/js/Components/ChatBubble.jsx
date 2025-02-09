export default function ChatBubble({ message, authUser }) {
    const isSender = message?.user_id === authUser.id;
    return (
        <div
            className={`flex items-start ${
                isSender && "flex-row-reverse"
            } gap-2.5 mb-4`}
        >
            <div
                className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${
                    isSender
                        ? "rounded-s-xl rounded-ee-xl bg-black"
                        : "rounded-e-xl rounded-es-xl bg-gray-200"
                } dark:bg-gray-700`}
            >
                <div
                    className={`flex items-center ${
                        isSender && "flex-row-reverse gap-2"
                    } space-x-2 rtl:space-x-reverse`}
                >
                    <span
                        className={`text-sm font-semibold ${
                            isSender ? "text-white text-right" : "text-gray-900"
                        } dark:text-white`}
                    >
                        {message?.sender?.name}
                    </span>
                    <span
                        className={`text-sm font-normal ${
                            isSender ? "text-white text-right" : "text-gray-900"
                        } dark:text-gray-400`}
                    >
                        {new Date(message?.created_at).toLocaleString()}
                    </span>
                </div>
                <p
                    className={`text-sm font-normal py-2.5 ${
                        isSender ? "text-white text-right" : "text-gray-900"
                    } dark:text-white`}
                >
                    {message?.content}
                </p>
                {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Delivered
                </span> */}
            </div>
        </div>
    );
}
