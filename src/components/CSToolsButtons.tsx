import * as cornerstoneTools from "cornerstone-tools";

interface Props {
  refElement: React.MutableRefObject<HTMLDivElement | null>;
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
  };
  const disableTool = () => {
    cornerstoneTools.setToolDisabledForElement(
      props.refElement.current,
      "Length"
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
