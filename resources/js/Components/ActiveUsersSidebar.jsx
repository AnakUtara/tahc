import { Sidebar } from "flowbite-react";

export default function ActiveUsersSidebar({
    authUser,
    activeUserList,
    handleCreateChatroom,
    hidden = true,
}) {
    return (
        <Sidebar
            className={`${
                hidden
                    ? "hidden sm:block"
                    : "[&>div]:bg-transparent [&>div]:p-0"
            } h-full`}
        >
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <div className="prose">
                        <h3 className="mb-0 text-gray-900">
                            Welcome {authUser.name}!
                        </h3>
                        <p className="mb-4 text-sm text-gray-900">
                            Find your anonymous person to chat with:
                        </p>
                    </div>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup className="h-full overflow-y-auto">
                    {activeUserList.length > 0 &&
                        activeUserList.map((user) => (
                            <Sidebar.Item key={user.id}>
                                <div
                                    className="prose text-left"
                                    onClick={() =>
                                        handleCreateChatroom(user.id)
                                    }
                                >
                                    <h2 className="m-0">{user.name}</h2>
                                    <p className="text-sm">Online</p>
                                </div>
                            </Sidebar.Item>
                        ))}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
