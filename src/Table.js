import React, { useState, useEffect } from 'react';


function Table() {
    const [coinsData, setCoinsData] = useState([]);
    const [userData, setUserData] = useState(null); // Stores user data including user ID
    const [token, setToken] = useState(null); // Stores authentication token

    useEffect(() => {
        const fetchCoinsData = async () => {
            try {
       //old code here

// Retrieve user ID and token from localStorage (if available)
                const userId = localStorage.getItem('userId');
                const storedToken = localStorage.getItem('access_token');

                setToken(storedToken);

                // Fetch user data conditionally (only if user ID exists)
                if (userId) {
                    try {
                        const userCoinResponse = await fetch(`http://localhost:8080/api/v1/bot/usercoins/${userId}/coinsWithMarketData`, {
                            headers: {
                                Authorization: `Bearer ${storedToken}`, // Pass the token directly
                            },
                        });

                        const userCoinData = await userCoinResponse.json();

                        if (userCoinResponse.ok) {
                            const formatter = new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            });
                            const formattedUserCoinData = userCoinData.map((userCoin) => ({
                                CoinId: userCoin.coin.coinId.CoinId,
                                iconUrl: userCoin.coin.iconUrl, // Add icon URL
                                name: userCoin.coin.name,
                                price: formatter.format(userCoin.marketData.currentPrice), // Format price
                                allTimeHigh: formatter.format(userCoin.marketData.ath), // Format all-time high
                                marketCap: formatter.format(userCoin.marketData.marketCap), // Format market cap
                                circulatingSupply: formatter.format(userCoin.marketData.circulatingSupply),
                                totalSupply: formatter.format(userCoin.marketData.totalSupply),
                                maxSupply: formatter.format(userCoin.marketData.maxSupply),
                            }));

                            setCoinsData([...coinsData, ...formattedUserCoinData]); // Merge user coin data
                        } else {
                            console.error('Error fetching user coins:', userCoinResponse.statusText);
                        }
                    } catch (error) {
                        console.error('Error fetching user coins:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCoinsData();
    }, []);


    const handleDeleteCoin = async (coinId) => {
        const storedToken = localStorage.getItem('access_token');

        setToken(storedToken);
        if (!storedToken) {
            console.error('Missing access token for deletion');
            return;
        }

        try {
            const deleteResponse = await fetch(`http://localhost:8080/api/v1/bot/1/coins/${coinId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            if (deleteResponse.ok) {
                console.log('Coin deleted successfully');
                setCoinsData(coinsData.filter((coin) => coin.marketData.coinMarketDataId.coinId !== coinId)); // Update table data using marketData.coinMarketDataId.coinId
            } else {
                console.error('Error deleting coin:', deleteResponse.statusText);
            }
        } catch (error) {
            console.error('Error deleting coin:', error);
        }
    };




    return (
        <div className="flex flex-col overflow-x-auto"> {/* Wrap table in flex container */}
            <table className="table table-hover w-full"> {/* Set table width to full */}
                <thead>
                <tr>
                    <th style={{ color: 'white' }}>Icon</th>
                    <th style={{ color: 'white' }}>Name</th>
                    <th style={{ color: 'white' }}>Price (USD)</th>
                    <th style={{ color: 'white' }}>All-Time High</th>
                    <th style={{ color: 'white' }}>Market Cap</th>
                    <th style={{ color: 'white' }}>Circulating Supply</th>
                    <th style={{ color: 'white' }}>Total Supply</th>
                    <th style={{ color: 'white' }}>Max Supply</th>
                    <th style={{ color: 'white' }}>ATH MC price</th>
                    <th style={{ color: 'white' }}>ATH MC X</th>
                    <th style={{ color: 'white' }}>ATH CS</th>
                    <th style={{ color: 'white' }}>Current pp</th>
                    <th style={{ color: 'white' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {coinsData.map((coin, index) => (
                    <tr key={index}>
                        <td>
                            {coin.iconUrl && (
                                <img
                                    src={coin.iconUrl}
                                    alt={`${coin.name} Icon`}
                                    width={20}
                                    height={20}
                                    className="inline-block mr-2" // Add inline styling
                                />
                            )}
                        </td>
                        <td>{coin.name}</td>
                        <td>{coin.price}</td>
                        {/* Use formatted price directly */}
                        <td>{coin.allTimeHigh}</td>
                        {/* Use formatted all-time high directly */}
                        <td>{coin.marketCap}</td>
                        {/* Use formatted market cap directly */}
                        <td>{coin.circulatingSupply ? coin.circulatingSupply : 'N/A'} $</td>
                        <td>{coin.totalSupply ? coin.totalSupply : 'N/A'} $</td>
                        <td>{coin.maxSupply ? coin.maxSupply : 'N/A'}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteCoin(coin.userCoinId)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}


export default Table;