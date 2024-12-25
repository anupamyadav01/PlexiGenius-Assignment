import { BrowserRouter } from "react-router-dom";
import Sidebar from "./admin/components/Sidebar";
import AppRoutes from "./admin/AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="w-full border border-red-700">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
