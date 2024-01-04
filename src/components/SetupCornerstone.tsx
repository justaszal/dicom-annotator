import { useEffect } from "react";
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

export default function SetupCornerstoneComponent() {
  // TODO: remove unecessary statements
  // setup cornerstone once
  useEffect(() => {
    console.log("setupCornerstone");
    setupCornerstone();
    localStorage.setItem("debug", "cornerstoneTools");
  },[]);
  return <></>;
}
