import { useEffect } from "react";
import { toast } from "sonner";

export default function useChatNotification(activeChatroom, authUser) {
    useEffect(() => {
        if (!activeChatroom)
            Echo.private(`App.Models.User.${authUser.id}`).notification(
                ({ content, sender }) => {
                    toast(
                        <div className="prose">
                            <h4 className="mb-1">{sender}</h4>
                            <p>{content}</p>
                        </div>
                    );
                }
            );
        return () => {
            Echo.leave(`App.Models.User.${authUser.id}`);
        };
    }, [activeChatroom]);
}
