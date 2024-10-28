// Contoh penggunaan di komponen React
import { useState } from "react";

const UpdatePasswordForm = () => {
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Gagal memperbarui password.");
    }
  };

  return (
    <form onSubmit={handleUpdatePassword}>
      <div>
        <label>User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Password</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdatePasswordForm;
