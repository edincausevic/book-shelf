import React from 'react';
import axios from 'axios';

const Logout = (props) => {

  let request = axios.get('/api/logout')
    .then(res => {
      setTimeout(() => {
        props.history.push('/');
      }, 1000);
    })

  return (
    <div className="logout_container">
      <h1>Soory to see you go :(</h1>
    </div>
  );
};

export default Logout;