import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import SetupCornerstoneComponent from "./components/SetupCornerstone";
import FileInputComponent from "./components/FileInput";
import MedicalImageCanvas from "./components/MedicalImageCanvas";
import ErrorMessage from "./components/ErrorMessage";
import CSToolsButtons from "./components/CSToolsButtons";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function Main() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [isInputInvalid, setIsInputInvalid] = useState(false);

  const handleFileUpload = (isSuccessful: boolean) => {
    setIsInputInvalid(!isSuccessful);
  };

  return (
    <div>
      <SetupCornerstoneComponent/>
      <FileInputComponent
        elementRef={imageRef}
        onFileUpload={handleFileUpload}
      ></FileInputComponent>
      <MedicalImageCanvas
        elementRef={imageRef}
        hideCanvas={isInputInvalid}
      ></MedicalImageCanvas>
      {isInputInvalid ? <ErrorMessage /> : null}
      <CSToolsButtons refElement={imageRef}></CSToolsButtons>
      {/*
      <CSAnnotations></CSAnnotations>
      <ReportSummaryComponent></ReportSummaryComponent> */}
    </div>
  );
}

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
