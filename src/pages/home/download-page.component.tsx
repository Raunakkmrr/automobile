import { Button } from "@/components/ui/button";
import DownloadIcon from "/src/assets/icons/upload-file.svg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { DiamondIcon } from "lucide-react";

const DownloadPage = () => {
  const { state } = useLocation();
  const { toast } = useToast();
  const [inputUrl, setInputUrl] = useState("");
  const [outputUrl, setOutputUrl] = useState("");

  useEffect(() => {
    axios
      .get("https://api.carromm.com/automobile/background/replace", {
        params: {
          sku_id: state?.skuID || "",
        },
        headers: {
          Accept: "application/json",
          Authorization: "510700f6-15eb-4f37-8270-a856c6caf101",
        },
      })
      .then((response: any) => {
        // handle success
        setInputUrl(response?.input_url);
        setOutputUrl(response?.output_url);
      })
      .catch(() => {
        // handle error
        toast({
          description: "Not able to fetch the image. Please try again",
          variant: "destructive",
        });
      });
  }, []);

  const downloadImageHandler = () => {
    const link = document.createElement("a");
    link.href = outputUrl;
    link.download = "output_image.jpg"; // or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="px-10 mt-20 ">
      <main className="flex justify-center">
        <div className="inline-flex items-center justify-center w-auto h-auto p-10 mx-auto border shadow-lg">
          <div className="relative">
            <img src={inputUrl} className="h-96" />
            <span className="absolute top-0 left-0 p-1 text-black bg-purple-200">
              Before
            </span>
          </div>
          <div className="flex flex-col h-[32rem] w-auto items-center">
            <DiamondIcon fill="purple" color="purple" />
            <div className="bg-purple-600 h-[28rem] w-[2px]" />
            <DiamondIcon fill="purple" color="purple" />
          </div>
          <div className="relative">
            <img src={outputUrl} className="h-96" />
            <span className="absolute top-0 left-0 p-1 text-black bg-purple-200">
              After
            </span>
          </div>
        </div>
      </main>
      <div className="flex justify-end">
        <Button
          onClick={downloadImageHandler}
          className="flex items-center gap-1 bg-blue-600"
        >
          <img
            src={DownloadIcon}
            className="rotate-180"
            alt="magic wand"
            width={20}
            height={20}
          />{" "}
          Download Image
        </Button>
      </div>
    </section>
  );
};

export default DownloadPage;
