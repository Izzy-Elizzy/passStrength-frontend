import { useState, useEffect } from 'react';
import Lock from './media/lock.png';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  useEffect(() => {
    const body = document.querySelector('body');
    if (strength === 'Weak') {
      body.classList.remove('bg-green-500');
      body.classList.remove('bg-blue-500');
      body.classList.add('bg-red-500', 'transition', 'duration-500', 'ease-in-out');
    } else if (strength === 'Medium') {
      body.classList.remove('bg-red-500');
      body.classList.remove('bg-green-500');
      body.classList.add('bg-blue-500', 'transition', 'duration-500', 'ease-in-out');
    } else if (strength === 'Strong') {
      body.classList.remove('bg-red-500');
      body.classList.remove('bg-blue-500');
      body.classList.add('bg-green-500', 'transition', 'duration-500', 'ease-in-out');
    } else {
      body.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-green-500');
    }
  }, [strength]);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
    setTimeout(async () => {
      const response = await fetch('http://107.20.75.89/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "password": event.target.value })
      });
      const data = await response.json();
      setStrength(data.predictions[0])
    }, 0);
  }

  return (
    <div className="flex flex-col justify-center w-screen h-screen">
      <div className='flex justify-center h-1/2 w-full '>
        <img className='pt-10' src={Lock} alt='lock' />
      </div>
      <div className='flex justify-center align-content-center h-1/2 w-full '>
        <div className='flex flex-col place-items-center'>
          <h1 className='text-5xl pb-2'>How Secure is My Password?</h1>
          <input
            type='text'
            value={password}
            onChange={handleInputChange}
            placeholder='Enter your password'
            className="block w-full rounded-md border-0 py-1.5 pl-7 
                       pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 
                       placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                       focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          <h1 className='pt-10 text-9xl'>{strength}</h1>
        </div>
        
      </div>
    </div>
  );
}

export default App;
