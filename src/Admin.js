import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import Swal from 'sweetalert2' ;
import Update from "./Update";

function Admin() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editableUserId, setEditableUserId] = useState(null);
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
    }, []); // Empty dependency array to fetch data on component mount



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
                // User deleted successfully
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



    return (
        <div className="overflow-x-auto">
            <Navbar />
            <table className="table">
                {/* Head */}
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
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                {/* Body */}
                <tbody>
                {/* Conditionally render user data if users state is not empty */}
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.userId}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox"/>
                                </label>
                            </th>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.completeName}</td>
                            <td>{user.status}</td>
                            <td>
                                {editableUserId === user.userId ? (
                                    <Update userId={user.userId} />
                                ) : (
                                    <>
                                <button className="btn btn-outline btn-error w-20 mr-2 " onClick={() => handleDeleteUser(user.userId)}>Delete</button>
                                <Update userId={user.userId}/>
                                    </>
                            )}
                            </td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">
                            {isLoading ? (
                                <p>Loading users...</p>
                            ) : error ? (
                                <p style={{ color: "red" }}>{error}</p>
                            ) : (
                                <p>No users found.</p>
                            )}
                        </td>
                    </tr>
                )}
                </tbody>

                {/* Foot */}

            </table>
        </div>
    );
}

export default Admin;
