import './App.css'
import { Link, Routes, Route} from 'react-router-dom';
import Hiscores from './Hiscores';
import Bosses from './Bosses'

function App() {
  

  return (
    <>
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">OSRS Search</h1>
      <ul class="flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
        <li>
          <Link to="/">
          <button className="bg-blue-500 px-4 text-white ml-4 rounded-full hover: md:me-6">Home</button>
          </Link><br/>
        </li>
        <li>
          <Link to="/hiscores">
            <button className="bg-blue-500 px-4 text-white ml-4 rounded-full hover: md:me-6">Hiscores</button>
          </Link><br/>
        </li>
        <li>
          <Link to="/bosses">
            <button className="bg-blue-500 px-4 text-white ml-4 rounded-full hover: md:me-6">Bosses</button>
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<div></div>}/>
        <Route path="/hiscores" element={<Hiscores />}/>
        <Route path="/bosses" element={<Bosses />} />
      </Routes>
    </>
  )
}

export default App
