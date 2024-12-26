import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 md:px-8 lg:px-16">
      <div className="relative w-full max-w-3xl">
        <img
          src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found-1024x576.png"
          alt="Page Not Found"
          className="rounded-lg object-cover w-full"
        />
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center">
        Oops! Page Not Found
      </h1>

      <p className="mt-4 text-gray-600 text-sm md:text-base lg:text-lg text-center max-w-2xl">
        The page you are looking for does not exist or might have been moved.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="mt-6 px-6 py-3 text-sm md:text-base lg:text-lg text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;
