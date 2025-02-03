import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dashboard({ authUser }) {
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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Lobby
                </h2>
            }
        >
            <Head title="Lobby" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                        <div className="p-6 text-gray-900">
                            Who is in the lobby:
                        </div>
                        {activeUserList.length > 0 &&
                            activeUserList.map((user) => (
                                <div
                                    className="flex items-center justify-between p-2 border border-gray-500"
                                    key={user.id}
                                >
                                    <p>{user.name}</p>
                                    <p>Online</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
