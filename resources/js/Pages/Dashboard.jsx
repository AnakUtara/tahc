import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [activeUserList, setActiveUserList] = useState([]);

    async function getActiveUserList() {
        try {
            const res = await axios.get(route("active-users.index"));
            setActiveUserList(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        Echo.private("update-lobby").listen("UpdateActiveUserList", (e) => {
            console.log(e.test);
            getActiveUserList();
        });

        getActiveUserList();

        return () => {
            Echo.leave("update-lobby");
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
                        <pre>
                            <code>
                                {JSON.stringify(activeUserList, null, 2)}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
