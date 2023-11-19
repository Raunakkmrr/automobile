import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";
import { assetActions } from "./context/assets-slice";
import Navbar from "./features/navbar/navbar.component";
import Sidebar from "./features/sidebar/sidebar.component";
import DownloadPage from "./pages/home/download-page.component";
import FiltersPage from "./pages/home/filterPage.component";
import Home from "./pages/home/home.component";

const App = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  useEffect(() => {
    axios
      .get("https://api.carromm.com/automobile/background/assets", {
        headers: {
          Accept: "application/json",
          Authorization: "510700f6-15eb-4f37-8270-a856c6caf101",
        },
      })
      .then((response) => dispatch(assetActions.setAssets(response?.data)))
      .catch(() =>
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
          <Route path="download" element={<DownloadPage />} />
          <Route path="/:filters" element={<FiltersPage />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
};

export default App;
