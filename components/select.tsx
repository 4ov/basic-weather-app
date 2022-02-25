import { useEffect, useRef, useState } from "preact/hooks";
import { useClickAway } from "react-use";

//parse css matrix
const mReg = /matrix\(([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*)\)/;
const mArr = ["scaleX", "skewY", "skewX", "scaleY", "translateX", "translateY"];

const toMatrix = (o: any) => {
  let result = "matrix(";
  mArr.forEach((key, i) => {
    result += `${o[key]},`;
  });
  result = result.slice(0, -1) + ")";

  return result;
};


export default function Select({
  options = [],
  onChange = (c: { title: string; value: string }) => {},
}) {
  const selectRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  useClickAway(selectRef, () => {
    setOpen(false);
  });

  const [current, setCurrent] = useState(
    options.find((o) => o?.default === true) ?? options[0]
  );
  const [open, setOpen] = useState(false);
  useEffect(() => {
    onChange(current);
  }, [current]);

  useEffect(() => {
    const { top, left, width, height } =
      mainRef.current.getBoundingClientRect();
    const computed = getComputedStyle(mainRef.current);
    // let mm : { scaleX : number, scaleY : number, translateX : number, translateY : number } = mReg.exec(
    //     computed.transform
    // )?.slice?.(1)?.map?.(i=>i.trim())?.map?.(Number)?.reduce?.((p,c,i)=>{
    //     p[mArr[i]] = c
    //     return p
    // },{} as any)
    

    //best solution for now
    if (left + width > window.innerWidth) {
      if (width > window.innerWidth) {          
        mainRef.current.style.left = "0";
      } else {
          
        mainRef.current.style.left =
          +computed.left.split("px")[0] -
          +(computed?.padding?.split?.("px")[0] ?? 0) -
          16 -
          (left + width - window.innerWidth) +
          "px";
      }
    } 
  }, [open]);

  return (
    <div className="_select" ref={selectRef}>
      <div onClick={() => setOpen(!open)} className={"_current"}>
        {current.title}
      </div>
      <div ref={mainRef} className={`_options ${open ? "open" : "close"}`}>
        {options.map((opt) => {
          return (
            <span
              className={`_option ${
                opt.value === current.value ? "selected" : ""
              }`}
              onClick={() => {
                if (opt.value !== current.value) {
                  setCurrent(opt);
                  setOpen(false);
                }
              }}
            >
              {opt.title}
            </span>
          );
        })}
      </div>
    </div>
  );
}
