export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {children}
    </div>
  );
}
