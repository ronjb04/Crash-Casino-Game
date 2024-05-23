import { FC, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import classNames from 'classnames';

interface ChatProps {
  userName: string;
}

interface Message {
  user: string;
  text: string;
}

const socket = io('http://localhost:4000'); // Update with your server URL

const colorPalette = [
  'text-red-500',
  'text-pink-500',
  'text-purple-500',
  'text-green-500',
  'text-blue-500',
  'text-yellow-500',
  'text-indigo-500',
  'text-teal-500',
];

const Chat: FC<ChatProps> = ({ userName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [userColors, setUserColors] = useState<{ [key: string]: string }>({});
  const chatContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    socket.on('receiveMessage', (message: Message) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, message];
        assignUserColor(message.user);
        return newMessages;
      });
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const assignUserColor = (user: string) => {
    setUserColors((prevUserColors) => {
      if (prevUserColors[user]) {
        return prevUserColors;
      }

      const newColor = colorPalette[Object.keys(prevUserColors).length % colorPalette.length];
      return { ...prevUserColors, [user]: newColor };
    });
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = { user: userName, text: message };
      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  return (
    <div className='mt-6'>
      <div className="flex items-center mb-2">
        <svg className="mr-2 w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"/>
        </svg>
        <h2 className="font-bold text-xl">Chat</h2>
      </div>
      <div className="bg-gray-800 rounded-lg">
        <ul ref={chatContainerRef} className='py-2 px-2 h-36 max-h-36 overflow-auto flex flex-col '>
          {messages.map((msg, index) => (
            <li key={index}>
              <dl className='flex m-1'>
                <dt className={classNames('mr-2 font-bold', userColors[msg.user])} >{msg.user}: </dt>
                <dd>{msg.text}</dd>
              </dl>
            </li>
          ))}
        </ul>
        <div>
          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <input
              id="chat"
              className="block mr-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button disabled={!userName} className="inline-flex justify-center p-2 text-white cursor-pointer py-2 px-4 rounded bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold disabled:opacity-50" onClick={handleSend}>
              <span className="">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
