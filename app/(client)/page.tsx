"use client";

import { useParams } from "next/navigation";

export default function HomePage() {
  const params = useParams();
  console.log(params);
  const newsData = [
    {
      id: 1,
      title: "News Article 1",
      description: "This is the first news article description.",
    },
    {
      id: 2,
      title: "News Article 2",
      description: "This is the second news article description.",
    },
    {
      id: 3,
      title: "News Article 3",
      description: "This is the third news article description.",
    },
  ];

  return (
    <>
      <div className="bg-blue-500 text-white text-center p-16 rounded-lg">
        <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
        <p className="mt-4">
          Your one-stop source for the latest news and updates.
        </p>
      </div>

      <div className="bg-gray-100 py-12 mt-12 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsData.map((news) => (
              <div key={news.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">{news.title}</h3>
                <p>{news.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
