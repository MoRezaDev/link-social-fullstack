import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import useUser from "../../hooks/useUser";

function UserEditForm({ modalRef, onClose, user }) {
  const [category, setCategory] = useState("");
  const [username, setUsername] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const domain = "https://mehrgan.com";

  const { users } = useUser();

  const handleCopy = () => {
    const textToCopy = `${domain}${category ? `/${category}` : ""}/${username}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (username.length === 0) {
      return toast.error("Username should not be empty");
    }

    const usersTemp = users;
    const userIndex = usersTemp.findIndex((us) => us.id === user.id);
    if (userIndex !== -1) {
      usersTemp[userIndex] = {
        ...users[userIndex],
        name: username,
        category,
        url: `${domain}${category ? `/${category}` : ""}/${username}`,
      };
      console.log(usersTemp);
      localStorage.setItem("users", JSON.stringify(usersTemp));
    }

    setIsButtonDisabled(true);
    toast.success("Successfully updated and saved to local storage!");
    setTimeout(() => location.reload(), 1000);
  };

  return (
    <div
      ref={modalRef}
      className={`bg-white flex-1 max-w-[600px] p-6 rounded-lg shadow-lg w-80 relative transform transition-transform duration-300`}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        <FaTimes className="text-xl" />
      </button>
      <h2 className="text-lg font-semibold mb-4">Add User</h2>
      {/* Add your form or content here */}
      <form onSubmit={submitHandler}>
        {/* Category Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category(Optional)
          </label>
          <input
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Domain Display with Transparent Copy Button */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Your domain is
          </label>
          <div className="relative">
            <input
              type="text"
              disabled
              value={`${domain}${category ? `/${category}` : ""}/${username}`}
              className="mt-1 block w-full px-3 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
      bg-gray-100 overflow-x-auto whitespace-nowrap"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 bg-transparent"
              onClick={handleCopy}
            >
              <FaCopy />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          disabled={isButtonDisabled ? true : false}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UserEditForm;
