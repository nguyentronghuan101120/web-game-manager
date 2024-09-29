export default function ErrorInputField({ error }: { error?: string }) {
  return <p className="text-red-500 text-sm mb-5">{error}</p>;
}
