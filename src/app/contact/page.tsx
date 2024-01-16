"use client";
import React, { useState } from "react";

export default function ContactPage() {
  const [showMore, setShowMore] = useState(false);

  const show = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="bg-gray-200 p-10 h-screen">
      <div className="p-2 bg-white min-h-40">
        <p>Contact us page</p>
        <button
          className="mt-4 text-white bg-black rounded-md p-2 hover:rounded-sm"
          onClick={show}
        >
          {showMore ? "Hide" : "Show more data"}
        </button>
        {showMore ? (
          <div className="mt-5">
            <p className="text-xl">Are you ready child</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
