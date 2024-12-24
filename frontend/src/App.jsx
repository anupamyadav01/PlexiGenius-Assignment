import Sidebar from "./admin/components/Sidebar";
import Dashboard from "./admin/pages/Dashboard/Dashboard";

const App = () => {
  return (
    <>
      <div className="flex w-full h-full">
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
};

export default App;
