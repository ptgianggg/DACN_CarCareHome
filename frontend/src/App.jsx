import Dashboard from "./pages/Admin/Dashboard";
import ServiceManagement from "./pages/Admin/Services";

function App() {
  const path = window.location.pathname.toLowerCase();

  if (path === "/services") {
    return <ServiceManagement />;
  }

  return <Dashboard />;
}

export default App;
