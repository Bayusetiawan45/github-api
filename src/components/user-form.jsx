import React from 'react';
import '../styles/home.css'

const UserForm = ({onSubmit, onChange}) => {
  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <h3>Login</h3>
        <input
          type="text"
          name='username'
          placeholder='Enter your github username'
          onChange={onChange}
          required
        />
        <input
          type="text"
          name='access_tokens'
          placeholder='Access token'
          onChange={onChange}
        />
        <p>*for access private repository</p>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default UserForm;