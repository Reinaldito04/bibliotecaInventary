// componentsUser/Username.jsx
'use client';
import { useEffect, useState } from 'react';

export const Username = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return <span>{username}</span>;
};

export default Username;
