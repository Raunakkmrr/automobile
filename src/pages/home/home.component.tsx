import { filterActions } from "@/context/filters-slice";
import { RootState } from "@/context/store";
import UploadImage from "@/features/upload-image/upload-image.component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { assets } = useSelector((state: RootState) => state.assets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                <button
                  onClick={() => {
                    dispatch(filterActions.setSelectedSampleImage(item));
                    navigate("/backgrounds");
                  }}
                  key={item}
                  className="border rounded-md h-44 w-80"
                >
                  <img
                    src={item}
                    alt={item}
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
