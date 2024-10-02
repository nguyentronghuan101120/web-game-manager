"use client";

import interceptor from "@/utils/network/interceptor";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    interceptor
      .get("/users") // Replace with your API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default HomePage;
