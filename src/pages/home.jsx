import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/user-form';

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      setTimeout(() => {
        navigate(`/profile/${user.username}`)
      }, 100)
    }
  }

  return (
    <UserForm onSubmit={handleSubmit} onChange={handleChange} />
  );
};

export default Home;