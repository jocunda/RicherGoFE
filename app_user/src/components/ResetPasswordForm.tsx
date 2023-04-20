import React, { useState } from "react";

const ResetPasswordForm: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangeCurrentPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {

      const cookieString = document.cookie; // Get cookie string

      const token = cookieString
        .split(';')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith('token='))
        ?.split('=')[1]; // Extract token value from cookie string


      // Call backend API for password change logic
      const response = await fetch("/api/Authenticate/changePassword", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        // Password changed successfully, do something
        alert('Password changed successfully');
      } else {
        // Handle error response from API
        alert('Failed to change password:');
      }
    } catch (error) {
      // Handle error in API call
      console.error('Failed to call API:', error);
    }

    // Clear form fields after submission
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          value={oldPassword}
          onChange={handleChangeCurrentPassword}
        />
        <br />
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={handleChangeNewPassword}
        />
        <br />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;