import { useNavigate } from "react-router-dom";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">
        403
      </h1>
      <p className="text-lg">
        Page Forbidden
      </p>
      <button
        onClick={() => navigate(-2)}
        className="text-blue-500 cursor-pointer"
      >
        Go Back
      </button>
    </div>
  );
}