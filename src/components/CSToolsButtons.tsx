// import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from "cornerstone-tools";

interface Props {
  refElement: React.MutableRefObject<HTMLDivElement | null>;
  onMeasurementAddition: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function CSToolsButtons(props: Props) {
  const enableTool = () => {
    cornerstoneTools.addToolForElement(
      props.refElement.current,
      cornerstoneTools.LengthTool
    );

    cornerstoneTools.setToolActiveForElement(
      props.refElement.current,
      "Length",
      { mouseButtonMask: 1 }
    );

    props.refElement.current?.addEventListener(
      cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED,
      props.onMeasurementAddition
    );
  };

  const disableTool = () => {
    cornerstoneTools.setToolDisabledForElement(
      props.refElement.current,
      "Length"
    );

    props.refElement.current?.removeEventListener(
      cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED,
      props.onMeasurementAddition
    );
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "#333",
          color: "#FFF",
          padding: "5px",
          margin: "10px",
        }}
        onClick={enableTool}
      >
        Enable tools
      </button>
      <div></div>
      <button
        style={{
          backgroundColor: "#333",
          color: "#FFF",
          padding: "5px",
          margin: "10px",
        }}
        onClick={disableTool}
      >
        Disable tools
      </button>
    </div>
  );
}
