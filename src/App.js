import './App.css';
import { motion } from "framer-motion"
import Navbar from './components/Navbar';
import Uploader from './components/Uploader';

function App() {
  return (
    <div className='main-container'>
      <Navbar />
      <Uploader />
    </div>
  );
}

export default App;
