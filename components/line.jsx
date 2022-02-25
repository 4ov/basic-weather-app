export default function Line({ h = 64, w = 2, bg = "white" }) {
    return (
      <span
        className="line"
        style={{
          "--h": `${h}px`,
          "--w": `${w}px`,
          display: "block",
          height: "var(--h)",
          width: "var(--w)",
          background: bg,
        }}
      ></span>
    );
  }
  