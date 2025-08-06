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
            <h5 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl sm:text-6xl dark:text-white">Search for Bosses</h5>
            <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="text-center px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Boss
                                </th>
                                <th scope="col" className="text-center px-6 py-3">
                                    Rank
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bossData.activities.map((activities, index) => (
                                <tr className="border-b border-gray-200 dark:border-gray-700" key={activities.name || index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">{activities.name}</th>
                                    <td className="text-center px-6 py-4">{activities.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            
        </div>
    );
}