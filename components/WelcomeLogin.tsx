import { useState } from 'react';

interface WelcomeLoginProps {
  onLoginSuccess: (name: string) => void; // Callback for successful login
}

const WelcomeLogin: React.FC<WelcomeLoginProps> = ({ onLoginSuccess }) => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(''); // Clear any previous error message
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === 'Thomas' || name === 'Ron') {
      onLoginSuccess(name);
    } else {
      setError('Invalid Name. Please enter "Thomas, Ron".');
    }
  };

  return (
    <div className="flex flex-col justify-stretch items-center h-full bg-gray-900">
      <div className="w-full bg-gray-800 p-10 pb-20 rounded-lg shadow-lg text-center flex flex-col h-full justify-center">
        <h2 className="text-white text-2xl mb-24">Welcome</h2>
        <form onSubmit={handleSubmit} className='relative'>
          <label className="block text-gray-400 mb-6">Please Insert Your Name</label>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            className="w-full p-2 mb-4 text-white bg-gray-900 border-slate-700 border rounded 
            focus-visible:outline-0 focus-visible:border-slate-500"
          />
          <button
            type="submit"
            disabled={name==""}
            className="w-full py-2 px-4 mb-4 rounded bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold disabled:opacity-50 "
          >
            Accept
          </button>
          {error && <p className="text-red-500 absolute -bottom-5">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default WelcomeLogin;