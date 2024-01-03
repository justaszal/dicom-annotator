"use client";

import React, { useRef, useEffect, useState } from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneMath from "cornerstone-math";
import * as dicomParser from "dicom-parser";
import Hammer from "hammerjs";

const setupCornerstone = (): void => {
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

  cornerstoneTools.init({
    globalToolSyncEnabled: true,
    showSVGCursors: true,
  });
};

const loadAndViewImage = async (file: File, element: HTMLElement) => {
  cornerstone.enable(element);

  const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

  try {
    const dataset = await cornerstone.loadAndCacheImage(imageId);
    cornerstone.displayImage(element, dataset);
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

const measurementEventAdd = (element: any, callback: any) => {
  const measurementCompletedEvent =
    cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED;
  element.addEventListener(measurementCompletedEvent, callback, false);
};

function SetupCornerstoneComponent() {
  // setup cornerstone once
  return <></>;
}

function ReportSummaryComponent() {
  const [summaryStatus, setSummaryStatus] = useState("");
  const [successCount, setCounter] = useState(0);

  const debounceRequest = () => {
    // implement debounce send request
    // pass variables with current summary text and current annotation count
    sendRequest("ABC", 1);
  };

  const sendRequest = (text: String, annotations: Number) => {
    // fix fetch based on response
    setSummaryStatus("mutating");
    fetch(
      `https://mocki.io/v1/3dd330f6-dabc-46e7-8763-be8c977f1667?text=${text}&annotations=${annotations}`
    );
    setSummaryStatus("success");
    setCounter(successCount + 1);
  };

  // clear counters and state on new image

  return (
    <>
      <input
        style={{ width: "512px", height: "512px", border: "1px solid black" }}
        onChange={debounceRequest}
        placeholder={"summary"}
      ></input>
      <span style={{ margin: "10px", color: "red" }}>
        {summaryStatus} ( {successCount} )
      </span>
    </>
  );
}

function ErrorMessage() {
  // show this component ONLY when we cannot parse DICOM file (f.e. not a DICOM or bad structure)
  return <>Cannot parse DICOM! Please try another file.</>;
}

function CSToolsButtons(element: any) {
  const enableTool = () => {
    cornerstoneTools.addToolForElement(
      element.element.current,
      cornerstoneTools.LengthTool
    );
    cornerstoneTools.setToolActiveForElement(
      element.element.current,
      "Length",
      { mouseButtonMask: 1 }
    );
  };
  const disableTool = () => {
    cornerstoneTools.setToolDisabledForElement(
      element.element.current,
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

function FileInputComponent(element: any) {
  // when file is uploaded - run handleUpload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // get image file form event
    const image = undefined;

    if (image && element.element.current) {
      loadAndViewImage(image, element.element.current);
    }
  };
  return (
    <form>
      <input type="file" />
    </form>
  );
}

function MedicalImageCanvas(element: any) {
  return (
    <div
      ref={element.element}
      style={{ width: "512px", height: "512px", border: "1px solid black" }}
    >
      <canvas className="cornerstone-canvas" />
    </div>
  );
}

function CSAnnotations() {
  // use measurementEventAdd to get current annotation count.
  // reset annotation count on image change.
  return (
    <div>
      There are x annotations completed!
      {/* There are {String(annotationCount)} annotations completed! */}
    </div>
  );
}

export default function Main() {
  const imageRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div>
      <SetupCornerstoneComponent></SetupCornerstoneComponent>
      <FileInputComponent element={imageRef}></FileInputComponent>
      <MedicalImageCanvas element={imageRef}></MedicalImageCanvas>
      <ErrorMessage></ErrorMessage>
      <CSToolsButtons element={imageRef}></CSToolsButtons>
      <CSAnnotations></CSAnnotations>
      <ReportSummaryComponent></ReportSummaryComponent>
    </div>
  );
}
