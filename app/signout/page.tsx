import React from 'react';

const Signout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-64 h-64 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center">
        <a href="/api/auth/locallogout" className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600 text-center">
          Logout locally
        </a>
        <a href="/api/auth/logout" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-center">
          Logout globally
        </a>
      </div>
    </div>
  );
};

export default Signout;
