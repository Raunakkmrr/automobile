import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { filterActions } from "@/context/filters-slice";
import { RootState } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";

const Window = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.filters);

  const sliderHandler = (value: any) => {
    dispatch(
      filterActions.setWindowsFilter({ value: value[0], key: "TRANSPARENCY" })
    );
  };
  return (
    <section className="w-full h-full px-4 py-10 bg-white border-2 rounded-lg">
      <h4 className="font-medium">Tint color</h4>

      <div className="flex items-center justify-around my-10">
        <div>
          <input
            type="color"
            value={filters?.window_refinement?.TINT_COLOR}
            onChange={(e) => {
              const hexColor = e.target.value;
              const r = parseInt(hexColor.slice(1, 3), 16);
              const g = parseInt(hexColor.slice(3, 5), 16);
              const b = parseInt(hexColor.slice(5, 7), 16);
              const rgbColor = `(${r}, ${g}, ${b})`;
              dispatch(
                filterActions.setWindowsFilter({
                  value: rgbColor,
                  key: "TINT_COLOR",
                })
              );
            }}
          />
        </div>
      </div>

      <h4 className="mb-5 font-medium">Tint intensity</h4>
      <Slider
        defaultValue={[0]}
        step={0.1}
        min={0}
        value={[filters?.window_refinement?.TRANSPARENCY]}
        max={1}
        onValueChange={sliderHandler}
      />
      <div className="flex items-center gap-2 my-8 font-semibold">
        <Checkbox
          checked={!!filters?.window_refinement?.TONE_ON_TONE}
          onCheckedChange={(e) =>
            dispatch(
              filterActions.setWindowsFilter({
                key: "TONE_ON_TONE",
                value: e,
              })
            )
          }
        />{" "}
        <p>Tone on Tone</p>
      </div>
      <div className="flex items-center gap-2 font-semibold">
        <Checkbox
          checked={!!filters?.window_refinement?.ADD_GLARE}
          onCheckedChange={(e) =>
            dispatch(
              filterActions.setWindowsFilter({
                value: e,
                key: "ADD_GLARE",
              })
            )
          }
        />{" "}
        <p>Add Glare</p>
      </div>
    </section>
  );
};

export default Window;
