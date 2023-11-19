import { RootState } from "@/context/store";
import UploadImage from "@/features/upload-image/upload-image.component";
import { useSelector } from "react-redux";

const Home = () => {
  const { assets } = useSelector((state: RootState) => state.assets);

  return (
    <>
      <section className="mt-20 ">
        <div className="w-9/12 mx-auto h-96 m">
          <UploadImage />
        </div>

        {/* sample images  */}
        <div className="px-10 my-8">
          <p className="text-2xl font-semibold">Try one of the images.</p>
          {assets?.sample_images?.length && (
            <div className="flex flex-wrap gap-5 p-1 rounded-lg">
              {assets?.sample_images?.map((item: any) => (
                <button key={item}>
                  <img
                    src={item}
                    alt="sample image"
                    className="object-cover rounded-md h-44 w-80"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
