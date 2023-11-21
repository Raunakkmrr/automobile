import { filterActions } from "@/context/filters-slice";
import { RootState } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";

const NumberPlate = () => {
  const { assets } = useSelector((state: RootState) => state.assets);

  const dispatch = useDispatch();
  return (
    <section className="w-full h-full px-4 py-10 bg-white border-2 rounded-lg">
      <div className="flex gap-5 max-sm:flex-wrap sm:flex-col">
        {assets?.number_plates?.map((item: any) => (
          <button
            onClick={() => {
              dispatch(filterActions.setNumberPlateFilter(item?.id));
              dispatch(filterActions.setPlateName(item?.name));
            }}
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
