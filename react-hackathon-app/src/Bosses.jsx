import { useState, useEffect } from 'react';

export default function Hiscores() {
    const [ searchInput, setSearchInput] = useState("");
    const [ playerName, setPlayerName ] = useState("");
    const [ bossData, setBossData ] = useState(null);
    const [isLoading, setIsLoading ] = useState(false);


    useEffect(() => {
        if(!playerName) return;
        setIsLoading(true);
        setBossData(null);
        fetch(`http://localhost:3001/api/hiscores?player=${playerName}`)
            .then(response => {
                if(!response.ok){
                    throw new Error('Player not found or invalid request');
                }
                return response.json();
            })
            .then(data => {
                setBossData(data);
                setIsLoading(false);
            });
            
    }, [playerName]);

    const handleSearch = () => {
        if(searchInput.trim()){
            setPlayerName(searchInput.trim());
        }
    };

    return (
        <div>
            <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            onChange={(event) => setSearchInput(event.target.value)}
            onKeyUp={(event) => {
                if(event.key === "Enter"){
                    handleSearch();
                }
            }}
            value={searchInput}/>
            {isLoading && <div>Loading...</div>}
            {bossData && (
                <>
                    <h2>Boss Ranks for {playerName}</h2>
                    {bossData.activities.map((activities, index) => (
                    <div key={index}>{activities.name + ': ' + activities.score}</div>
                    ))}
                </>
            )}

            
        </div>
    );
}
