import React, { useContext } from 'react';
// import { GlobalContext } from '../App';

import { Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  // const { login } = useContext(GlobalContext);

  return (
    <>
      {/* {login ? <Dashboard /> : <Navigate to='/login' />} */}
    </>
  );
};

export default ProtectedRoute;