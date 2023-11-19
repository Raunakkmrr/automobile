import { AssetState } from "@/context/assets-slice";
import { filterActions } from "@/context/filters-slice";
import { useDispatch, useSelector } from "react-redux";

const NumberPlate = () => {
  const { number_plates } = useSelector((state: AssetState) => state.assets);

  const dispatch = useDispatch();
  return (
    <section className="w-full h-full px-4 py-10 bg-white border-2 rounded-lg">
      <div className="flex gap-5 max-sm:flex-wrap sm:flex-col">
        {number_plates?.map((item: any) => (
          <button
            onClick={() =>
              dispatch(filterActions.setNumberPlateFilter(item?.id))
            }
            className="flex items-center justify-center p-1 overflow-hidden bg-gray-100 rounded-lg"
            key={item?.id}
          >
            <img
              className="object-contain w-32 h-20"
              src={item?.thumbnail}
              alt={item.name}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default NumberPlate;
