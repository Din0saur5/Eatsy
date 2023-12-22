import React, { useState } from 'react';

const Account = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = (field) => {

      if (field === 'password') {
          setCurrentPassword('');
          setNewPassword('');
      }
  };

  const handleDeleteAccount = () => {
      if (window.confirm('Are you sure you want to delete your account?')) {

      }
  };

  return (
    
      <div className="max-w-2xl mx-auto mt-10 ">
          <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-1 flex items-center justify-end font-semibold">Email:</div>
              <input
                  type="email"
                  className="col-span-1 p-2 border border-gray-300 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <button
                  className="col-span-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => handleUpdate('email')}
              >
                  Update
              </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-1 flex items-center justify-end font-semibold">Username:</div>
              <input
                  type="text"
                  className="col-span-1 p-2 border border-gray-300 rounded-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
              <button
                  className="col-span-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => handleUpdate('username')}
              >
                  Update
              </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="col-span-1 flex flex-col items-end font-semibold">
                  <label htmlFor="currentPassword" className="mb-2">Current Password:</label>
                  <label htmlFor="newPassword">New Password:</label>
              </div>
              <div className="col-span-1 flex flex-col">
                  <input
                      type="password"
                      id="currentPassword"
                      className="p-2 mb-2 border border-gray-300 rounded-lg"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <input
                      type="password"
                      id="newPassword"
                      className="p-2 border border-gray-300 rounded-lg"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                  />
              </div>
              <button
                  className=" mt-12 col-span-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => handleUpdate('password')}
              >
                  Update
              </button>
          </div>

          <div className="text-center">
              <button
                  className="mt-24 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={handleDeleteAccount}
              >
                  Delete Account
              </button>
          </div>
      </div>
   
  );
};

export default Account;
