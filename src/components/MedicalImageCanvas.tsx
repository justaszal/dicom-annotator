import React from "react";

interface Props {
  elementRef: React.MutableRefObject<HTMLDivElement | null>;
  hideCanvas: boolean;
}

export default function MedicalImageCanvas(props: Props) {
  return (
    <div
      ref={props.elementRef}
      style={{ width: "512px", height: "512px", border: "1px solid black" }}
    >
      <canvas
        className="cornerstone-canvas"
        style={{
          height: "100%",
          width: "100%",
          display: props.hideCanvas ? "none" : "block",
        }}
      />
    </div>
  );
}
