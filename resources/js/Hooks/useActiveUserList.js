import { useEffect, useState } from "react";

export default function useActiveUserList(authUser) {
    const [activeUserList, setActiveUserList] = useState([]);

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
        return () => {
            Echo.leave(`active-users`);
        };
    }, []);

    return [activeUserList];
}
