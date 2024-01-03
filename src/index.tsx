import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import SetupCornerstoneComponent from "./components/SetupCornerstone";
import FileInputComponent from "./components/FileInput";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function Main() {
  const imageRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div>
      <SetupCornerstoneComponent></SetupCornerstoneComponent>
      <FileInputComponent element={imageRef}></FileInputComponent>
      {/* <MedicalImageCanvas element={imageRef}></MedicalImageCanvas>
      <ErrorMessage></ErrorMessage>
      <CSToolsButtons element={imageRef}></CSToolsButtons>
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
