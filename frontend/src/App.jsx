import { BrowserRouter } from "react-router-dom";
import Sidebar from "./admin/components/Sidebar";
import AppRoutes from "./admin/AppRoutes";

const isAuthenticated = () => {
  // Check user authentication status
  return localStorage.getItem("userToken") !== null;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex w-full h-full">
        {isAuthenticated() && <Sidebar />}
        <div className="w-full h-full">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
