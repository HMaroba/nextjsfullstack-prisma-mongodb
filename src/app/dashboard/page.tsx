"use client";

import React from "react";
import { useQuery } from "react-query";

export default function Dashboard() {
  const getEmployees = async () => {
    const response = await fetch("/api/v1/employee");
    return response.json();
  };

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery("userData", getEmployees);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-2xl">Loading please wait ...</p>;
      </div>
    );
  }

  if (isError) {
    console.log(isError);
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-2xl">Error fetching data</p>;
      </div>
    );
  }

  const employeeInfo = userData.employee;
  console.log(employeeInfo);

  return (
    <div>
      <div className="p-20 text-lg text-blue">
        {employeeInfo.map((user: any, index: number) => (
          <p key={index}>{user.fullName}</p>
        ))}
      </div>
    </div>
  );
}
