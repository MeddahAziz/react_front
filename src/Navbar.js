import React, { useState, useEffect } from 'react';
import { Link , useHistory} from 'react-router-dom';

function Navbar() {
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchInput.trim() === '') {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/v1/bot/1/coins/find/${searchInput}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
            setLoading(false);
        };

        const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce search input

        return () => clearTimeout(timeoutId); // Cleanup function
    }, [searchInput]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleAddCoin = async (coinData) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/bot/1/coins/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    coinId: coinData.coinId.coinId,
                    symbol: coinData.symbol,
                    name: coinData.name,
                    iconUrl: coinData.iconUrl,
                    coinUrl: coinData.coinUrl
                })
            });

            if (response.ok) {
                console.log('Coin added successfully!');
                // Handle successful addition, e.g., display a success message
            } else {
                console.error('Error adding coin:', await response.text());
                // Handle error, e.g., display an error message
            }
        } catch (error) {
            console.error('Error adding coin:', error);
            // Handle network errors
        }
    };

    const handleSelectSuggestion = async (suggestion) => {
        // Call handleAddCoin with the selected suggestion data
        await handleAddCoin(suggestion);

        // Optionally, clear search input and suggestions after selection
        setSearchInput('');
        setSuggestions([]);
    };


    //logout logic
    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Clear access token from local storage
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        history.push('/login'); // Redirect to login page
    };



    return (
        <div className="navbar bg-base-100 dark:bg-gray-900">
            <div className="navbar-start">
                {/* ... dropdown menu ... */}
                <div className="dropdown" >
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle bg-white" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-200 rounded-box w-52 " data-theme="light">
                        <li><Link to="/main">Homepage</Link></li>
                        <li><a>Portfolio</a></li>
                        <li><Link to="/Admin">Admin Pannel</Link></li>
                        <li>
                            <button onClick={handleLogout}>Log out</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="text-xl text-white">Zedney Crypto</a>
            </div>
            <div className="navbar-end" >
                <div className="form-control" data-theme="light">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchInput}
                        onChange={handleInputChange}
                        className="input input-bordered rounded-none w-24 md:w-auto"
                    />
                    {loading ? (
                        <div>.</div> // Loading...
                    ) : suggestions.length > 0 && (
                        <ul className="dropdown-content w-full bg-gray-200">
                            {suggestions.map((suggestion, index) => (
                                <li key={index} className="dropdown-item hover:bg-base-100">
                                    <button onClick={() => handleSelectSuggestion(suggestion)} className="text-black">
                                        {suggestion.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* ... other navbar buttons ... */}

            </div>
        </div>
    );
}

export default Navbar;