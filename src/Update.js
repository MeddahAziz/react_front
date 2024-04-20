import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";

function Update({ userId }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(password); // Set confirmPassword to password by default
    const [completeName, setCompleteName] = useState("");
    const [status, setStatus] = useState("");
    const [Id, setUserId] = useState(userId);


    useEffect(() => {
        setUserId(userId);
    }, [userId]);

    const handleValidate = () => {
        //const userId = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("access_token");

        // Check if password matches confirmPassword
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const requestBody = {
            userId : Id,
            username: email,
            password,
            confirmPassword,
            completeName,
            status
        };

        // Send POST request to API endpoint
        fetch("http://localhost:8080/api/v1/bot/users/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to update user");
                }
                // Handle success, e.g., show a success message
                console.log("User updated successfully");
                //window.location.reload();
            })
            .catch(error => {
                // Handle error, e.g., show an error message
                console.error("Error updating user:", error);
            });
    };

    const test =() =>{
        document.getElementById('my_modal_5').showModal() ;
        console.log(Id) ;

    }

    return (
        <>
            <button className="btn w-20" onClick={() =>test() }>Edit User
            </button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg"></h3>
                    <p className="py-4">Edit user data UserID: {userId}</p>
                    <label className="input input-bordered flex items-center gap-2 my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                             className="w-4 h-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                        </svg>
                        <input type="text" className="grow" placeholder="Email" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </label>

                    <label className="input input-bordered flex items-center gap-2 my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                             className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd"
                                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                  clipRule="evenodd"/>
                        </svg>
                        <input type="password" className="grow" placeholder="Password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </label>

                    <label className="input input-bordered flex items-center gap-2 my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                             className="w-4 h-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
                        </svg>
                        <input type="text" className="grow" placeholder="Complete Name" value={completeName}
                               onChange={(e) => setCompleteName(e.target.value)}/>
                    </label>

                    <label className="input input-bordered flex items-center gap-2 my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                             className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd"
                                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                  clipRule="evenodd"/>
                        </svg>
                        <input type="password" className="grow" placeholder="Confirm Password" value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </label>

                    <select className="select select-bordered w-200 max-w-xs" value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                        <option disabled>Select User Status</option>
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Verification">Verification</option>

                    </select>

                    <div className="modal-action">
                        <button className="btn" onClick={handleValidate}>Validate</button>
                    </div>
                    <button className="btn" onClick={() => document.getElementById('my_modal_5').close()}>Close</button>
                </div>
            </dialog>
        </>
    );
}

export default Update;
