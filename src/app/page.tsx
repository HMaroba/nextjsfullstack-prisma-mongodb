"use client";
import React, { useState } from "react";

export default function Home() {
  const [selectedRole, setSelectedRole] = useState("");
  const [customRole, setCustomRole] = useState("");

  const roles = [
    { name: "Developer" },
    { name: "Accountant" },
    { name: "Marketing" },
    { name: "Manager" },
    { name: "Supervisor" },
  ];

  const handleRoleChange = (event: any) => {
    setSelectedRole(event.target.value);
  };

  const handleCustomRoleChange = (event: any) => {
    setCustomRole(event.target.value);
  };

  const handleAddCustomRole = () => {
    if (
      customRole.trim() !== "" &&
      !roles.some((role) => role.name === customRole)
    ) {
      // Add the custom role to the list of roles
      roles.push({ name: customRole });
      // Clear the custom role input
      setCustomRole("");
      console.log(roles);
      
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <p>FULLSTACK APP USING MONGODB, NEXT JS, PRISMA</p>
        <div className="mt-4 w-full">
          <label className="space-x-4 mr-4">User Role</label>
          <select
            className="border-3 border-blue-500 rounded-md w-full h-8"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            {roles.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Input field for custom role */}
        <div className="mt-4 w-full">
          <label className="space-x-4 mr-4">Custom Role</label>
          <input
            type="text"
            value={customRole}
            onChange={handleCustomRoleChange}
            className="border-3 border-blue-500 rounded-md w-full h-8 p-2"
          />
          <button
            onClick={handleAddCustomRole}
            className="px-2 py-1 mt-4 bg-blue-500 text-white rounded-md"
          >
            Add Custom Role
          </button>
        </div>
      </div>
    </main>
  );
}
