import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from "@/context/store";
import BackgroundFilter from "@/features/filter-panel/background.component";
import NumberPlate from "@/features/filter-panel/number-plate.component";
import Window from "@/features/filter-panel/window.component";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MagicWandIcon from "/src/assets/icons/magic-wand.svg";
import { useState } from "react";

const FiltersPage = () => {
  const {
    mainFile,
    filters,
    selectedImage,
    backgroundName,
    selectedFile,
    plateName,
    sampleSelectedImage,
  } = useSelector((state: RootState) => state.filters);
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const processImageHandler = () => {
    const formData = new FormData();

    if (!filters?.bg_id) {
      toast({
        description: "Please select a background first",
        variant: "destructive",
      });
      return;
    }

    if (!sampleSelectedImage) {
      const imageFile = selectedImage ? selectedFile : null;

      formData.append("image_file", imageFile);
    }
    if (sampleSelectedImage) formData.append("image_url", sampleSelectedImage);
    formData.append("bg_id", filters.bg_id ? filters.bg_id : "");
    formData.append(
      "window_refinement",
      filters.window_refinement ? JSON.stringify(filters.window_refinement) : ""
    );
    formData.append("interior_regeneration", "1");
    formData.append(
      "number_plate",
      filters.number_plate ? filters.number_plate : ""
    );
    if (sampleSelectedImage)
      formData.append(
        "extension",
        `.${
          sampleSelectedImage.split(".")[
            sampleSelectedImage.split(".").length - 1
          ]
        }`
      );
    else formData.append("extension", `.${mainFile}`);
    toast({
      description: "Uploading image...",
    });
    setIsLoading(true);
    axios
      .post("/api/automobile/background/replace", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "510700f6-15eb-4f37-8270-a856c6caf101",
        },
      })
      .then((response: any) => {
        setIsLoading(false);
        toast({ description: "Successfully processed request" });
        navigate(`/download/${response?.data?.sku_id}`);
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          description: "Not able to process image at this moment",
          variant: "destructive",
        });
      });
  };

  if (!sampleSelectedImage && !selectedImage)
    return (
      <>
        <section className="my-20 text-center">
          <h1 className="mb-5 text-2xl font-bold text-center">
            No image selected please go to home page and select an image
          </h1>
          <Button onClick={() => navigate("/")}>Home</Button>
        </section>
      </>
    );

  return (
    <section className="grid min-h-screen grid-cols-1 sm:grid-cols-5 bg-gray-50">
      <div className="col-span-1 px-5 py-3 border-none">
        {location.pathname.toLowerCase().includes("windows") && <Window />}
        {location.pathname.toLowerCase().includes("backgrounds") && (
          <BackgroundFilter />
        )}
        {location.pathname.toLowerCase().includes("number-plate") && (
          <NumberPlate />
        )}
      </div>
      <main className="flex flex-col items-center flex-1 min-w-full min-h-full col-span-4 gap-10 py-5 sm:col-span-4 bg-grap-50">
        <div className="w-6/12 px-2 py-3 bg-purple-100 rounded-lg h-4/12">
          <div className="p-5 bg-white border rounded-md">
            <img
              className="w-full h-full"
              src={sampleSelectedImage || selectedImage}
              alt="uploaded image"
            />
          </div>
        </div>

        <div className="relative flex items-center w-6/12 px-2 py-4 bg-white border max-sm:gap-3 max-sm:flex-wrap sm:justify-around rounded-3xl">
          <p className="absolute -top-[15px] left-8 font-bold z-auto">
            Category
          </p>
          <div className="font-semibold">
            BG: <span className="font-normal">{backgroundName}</span>
          </div>
          <div className="font-semibold">
            Window:{" "}
            <span className="font-normal">
              {filters?.window_refinement?.TRANSPARENCY}
            </span>
          </div>
          <div className="font-semibold">
            Number Plate: <span className="font-normal">{plateName}</span>
          </div>
        </div>

        <Button
          onClick={processImageHandler}
          className="flex items-center gap-1 bg-blue-600"
          disabled={isLoading}
        >
          <img src={MagicWandIcon} alt="magic wand" />{" "}
          {isLoading ? "Processing..." : "Process Image"}
        </Button>
      </main>
    </section>
  );
};

export default FiltersPage;
