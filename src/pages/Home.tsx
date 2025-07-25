import React, { useEffect, useState } from "react";
import userService from "../services/user";

interface User {
    id: number;
    name: string;
}

const Home: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await userService.getAll();
                setUsers(res.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-4">
            <ul className="space-y-2">
                {users.map((user) => (
                    <li key={user.id} className="text-gray-800">
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
