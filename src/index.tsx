import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import SetupCornerstoneComponent from "./components/SetupCornerstone";
import FileInputComponent from "./components/FileInput";
import MedicalImageCanvas from "./components/MedicalImageCanvas";
import ErrorMessage from "./components/ErrorMessage";
import CSToolsButtons from "./components/CSToolsButtons";
import CSAnnotations from "./components/CSAnnotations";
import ReportSummaryComponent from "./components/ReportSummaryComponent";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function DicomAnnotator() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [annotationCount, setAnnotationCount] = useState(0);
  const [isInputInvalid, setIsInputInvalid] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [successCount, setSuccessCounter] = useState(0);

  const handleFileUpload = (isSuccessful: boolean) => {
    setIsInputInvalid(!isSuccessful);
    setAnnotationCount(0);
    setSummaryText("");
    setSuccessCounter(0);
  };

  const handleMeasurementAddition = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setAnnotationCount(prev => prev + 1);
  };

  const handleSummaryTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newText = event.currentTarget.value;
    if (newText !== summaryText) {
      setSummaryText(newText);
    }
  };

  const handleSuccessfullRequest = () => {
    setSuccessCounter(prev => prev + 1);
  };

  return (
    <div>
      <SetupCornerstoneComponent />
      <FileInputComponent
        elementRef={imageRef}
        onFileUpload={handleFileUpload}
      ></FileInputComponent>
      <MedicalImageCanvas
        elementRef={imageRef}
        hideCanvas={isInputInvalid}
      ></MedicalImageCanvas>
      {isInputInvalid ? <ErrorMessage /> : null}
      <CSToolsButtons
        refElement={imageRef}
        onMeasurementAddition={handleMeasurementAddition}
      ></CSToolsButtons>
      <CSAnnotations annotationCount={annotationCount} />
      <ReportSummaryComponent
        annotationCount={annotationCount}
        summaryText={summaryText}
        onSummaryTextChange={handleSummaryTextChange}
        successCount={successCount}
        onSuccessfullRequest={handleSuccessfullRequest}
      />
    </div>
  );
}

root.render(
  <React.StrictMode>
    <DicomAnnotator />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
