import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Swal from 'sweetalert2';
import Update from "./Update";

function Admin() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editableUserId, setEditableUserId] = useState(null); // State to track the editable user

    const storedToken = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const userResponse = await fetch("http://localhost:8080/api/v1/bot/users/all", {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();

                    const formattedUserData = userData.map((user) => ({
                        userId: user.userId,
                        username: user.username,
                        completeName: user.completeName,
                        status: user.status,
                    }));

                    setUsers(formattedUserData);
                } else {
                    setError("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("An error occurred. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        setIsLoading(true);
        setError(null);

        try {
            const userResponse = await fetch(`http://localhost:8080/api/v1/bot/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            if (userResponse.ok) {
                const updatedUsers = users.filter((user) => user.userId !== userId);
                setUsers(updatedUsers);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User deleted ",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                setError("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditUser = (userId) => {
        setEditableUserId(userId); // Set the userId to be edited
    };

    return (
        <div className="overflow-x-auto">
            <Navbar />
            <table className="table">
                <thead>
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" className="checkbox"/>
                        </label>
                    </th>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Complete Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.userId}>
                        <td>
                            <label>
                                <input type="checkbox" className="checkbox"/>
                            </label>
                        </td>
                        <td>{user.userId}</td>
                        <td>{user.username}</td>
                        <td>{user.completeName}</td>
                        <td>{user.status}</td>
                        <td>
                            {editableUserId === user.userId ? (
                                <Update userId={user.userId} />
                            ) : (
                                <>
                                    <button onClick={() => handleEditUser(user.userId)}>Edit</button>
                                    <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
