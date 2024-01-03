import * as cornerstone from "cornerstone-core";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

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

export default function FileInputComponent(element: any) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && files.length > 0 && element.element.current) {
      const image = files[0];
      loadAndViewImage(image, element.element.current);
    }
  };
  return (
    <form>
      <input type="file" onChange={handleUpload} />
    </form>
  );
}
