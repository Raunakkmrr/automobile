import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";
import Navbar from "./features/navbar/navbar.component";
import Sidebar from "./features/sidebar/sidebar.component";
import DownloadPage from "./pages/home/download-page.component";
import FiltersPage from "./pages/home/filterPage.component";
import Home from "./pages/home/home.component";
import axios from "axios";
import { assetActions } from "./context/assets-slice";

const App = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Using useEffect to fetch assets data from the server when the component mounts.
  // The target URL is relative, and the actual request will be sent to the proxy URL defined in the package.json.
  // This is a workaround to bypass CORS issues when the backend does not set the appropriate CORS headers.
  useEffect(() => {
    axios
      .get("/api/automobile/background/assets", {
        headers: {
          Accept: "application/json",
          Authorization: "510700f6-15eb-4f37-8270-a856c6caf101",
        },
        withCredentials: true,
      })
      .then((response) => {
        // Dispatching an action to update the state with the fetched assets data.
        dispatch(assetActions.setAssets(response?.data));
      })
      .catch(() =>
        // Displaying a toast notification in case of an error.
        toast({
          description: "Not able to fetch assets at this moment",
          variant: "destructive",
        })
      );
  }, []);

  return (
    <>
      <div className="hidden sm:block">
        <Sidebar />
      </div>

      <div className="sm:pl-[150px] min-h-full min-w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="download/:sku_id" element={<DownloadPage />} />
          <Route path="/:filters" element={<FiltersPage />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
};

export default App;
