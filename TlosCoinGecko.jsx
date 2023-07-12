import React,{useEffect, useState} from 'react';
import axios from 'axios';

export default function TlosCoinGecko() {
    const [currentPrice, setCurrentPrice] = useState(null);

    useEffect(() => {
        const fetchCurrentPrice = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=telos');
                setCurrentPrice(response.data[0].current_price);
            } catch (error) {
                console.error("Error fetching current Telos price:", error);
            }
        };
        fetchCurrentPrice();
    }, []);

    if (currentPrice === null) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <p>Current Telos Price: ${currentPrice}</p>
        </div>
    );
}
