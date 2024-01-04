import * as cornerstone from "cornerstone-core";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import { MutableRefObject } from "react";

type LoadAndViewImage = (
  file: File,
  elementRef: HTMLElement
) => Promise<boolean>;
const loadAndViewImage: LoadAndViewImage = async (file, elementRef) => {
  cornerstone.enable(elementRef);

  const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

  try {
    const dataset = await cornerstone.loadAndCacheImage(imageId);
    cornerstone.displayImage(elementRef, dataset);
    return true;
  } catch (error) {
    return false;
  }
};

interface Props {
  elementRef: MutableRefObject<HTMLDivElement | null>;
  onFileUpload: (isSuccessful: boolean) => void;
}

export default function FileInputComponent(props: Props) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && files.length > 0 && props.elementRef.current) {
      const image = files[0];
      const isLoaded = await loadAndViewImage(image, props.elementRef.current);
      props.onFileUpload(isLoaded);
    }
  };
  return (
    <form>
      <input type="file" onChange={handleUpload} />
    </form>
  );
}
