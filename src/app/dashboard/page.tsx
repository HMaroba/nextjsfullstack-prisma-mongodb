"use client";

import React from "react";
import { useQuery } from "react-query";


type IEmployee = {
    fullName : string;
}

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

  const employeeInfo = userData.employees;
  return (
    <div className="p-20">
      <p className="text-2xl">Employee Data</p>
      <div className="p-3 text-lg text-blue-600">
        {employeeInfo.map((user : IEmployee, index: number) => (
          <p key={index}>{user.fullName}</p>
        ))}
      </div>
    </div>
  );
}
