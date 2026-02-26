export default function ErrorState({ message }) {
  return (
    <div className="text-center py-10 text-red-500">
      {message || "Something went wrong"}
    </div>
  );
}