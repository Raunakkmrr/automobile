import { filterActions } from "@/context/filters-slice";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UploadFileIcon from "/src/assets/icons/upload-file.svg";

const UploadImage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files

    localStorage.mainFile = acceptedFiles[0];

    dispatch(filterActions.setMainFile(acceptedFiles[0]?.type?.split("/")[1]));
    dispatch(
      filterActions.setSelectedImage(URL.createObjectURL(acceptedFiles[0]))
    );
    dispatch(filterActions.setSelectedFile(acceptedFiles[0]));
    dispatch(filterActions.removeAllFilter());

    navigate("/backgrounds");
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // Accept only image formats
  });

  return (
    <div
      className="flex items-center w-full h-full p-10 border-4 border-blue-100 rounded-xl"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="mx-auto text-2xl font-bold text-blue-500 animate-pulse">
          <p>Drop the files here ...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full bg-white border-none">
          <img src={UploadFileIcon} alt="upload" width={40} height={40} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
