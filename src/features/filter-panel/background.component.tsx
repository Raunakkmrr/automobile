import { AssetState } from "@/context/assets-slice";
import { filterActions } from "@/context/filters-slice";
import { RootState } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";

const BackgroundFilter = () => {
  const { assets } = useSelector((state: RootState) => state.assets);

  const dispatch = useDispatch();
  return (
    <section className="w-full h-full px-4 py-10 bg-white border-2 rounded-lg">
      <div className="flex flex-col gap-5">
        {assets?.backgrounds?.map((item: any) => (
          <button
            onClick={() => {
              dispatch(filterActions.setBackgroundFilter(item?.id));
              dispatch(filterActions.setBackgroundName(item?.name));
            }}
            className="flex items-center justify-center p-1 overflow-hidden bg-gray-100 rounded-lg"
            key={item?.id}
          >
            <img
              className="object-cover w-32 h-28"
              src={item?.thumbnail}
              alt={item.name}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default BackgroundFilter;
