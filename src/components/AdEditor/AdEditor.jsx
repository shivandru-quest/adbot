import { useState, useRef, useEffect, useContext } from "react";
import { Stage, Layer } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import CanvasImage from "../Canvas/CanvasImage";
import CanvasText from "../Canvas/CanvasText";
import CanvasShape from "./CanvasShape";
import Toolbar from "./Toolbar";
import PropertyPanel from "./PropertyPanel";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Toast } from "@questlabs/react-sdk";
import axios from "axios";
import {
  createUrl,
  base64ToFile,
  blobUrlToFile,
  createUrlBackend,
  getUserCredentials,
  loadImageAsBase64,
  dataURLtoBlob,
  compressFileForTemplatePoster,
} from "../../Config/generalFunctions";
import Loader from "../../ui/Loader";
import AdEditorTopBar from "../../ui/AdEditorTopBar";
import { motion } from "framer-motion";
import SidePanel from "../../ui/SidePanel";
import { AppContext } from "../../context/AppContext";

const AdEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { templateId } = useParams();
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [toolbarSelectedElement, setToolbarSelectedElement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stageRef = useRef(null);
  const { canvasSize, adData } = state;
  const [downloadFormat, setDownLoadFormat] = useState({
    platform: "",
    fileSize: "",
    fileLayout: "",
    fileName: "",
    fileType: "",
  });
  const [socialMediaPlatForm, setSocialMediaPlatform] = useState("");

  useEffect(() => {
    setDownLoadFormat((prev) => ({
      ...prev,
      fileName: adData?.title || "canvas",
    }));
  }, [adData]);
  function handleToolBarClick(tool) {
    if (tool === toolbarSelectedElement) {
      setToolbarSelectedElement(null);
    } else {
      console.log("tool", tool);
      setToolbarSelectedElement(tool);
    }
  }

  function addImage(url) {
    const newElement = {
      elementId: `ele-${uuidv4()}`,
      type: "image",
      src: url,
      url,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    };
    addElement(newElement);
  }

  function addText() {
    const newElement = {
      elementId: `ele-${uuidv4()}`,
      type: "text",
      text: "Double click to edit",
      x: 100,
      y: 100,
      fontSize: 20,
      fontFamily: "Arial",
      fill: "#000000",
      width: 200,
      align: "left",
      fontStyle: "normal",
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    };
    addElement(newElement);
  }

  function addShape(shapeType) {
    const newElement = {
      elementId: `ele-${uuidv4()}`,
      type: "shape",
      shapeType,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      fill: "#e3e3e3",
      stroke: "#000000",
      strokeWidth: 2,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      cornerRadius: 0,
      opacity: 1,
    };
    if (shapeType === "star") {
      newElement.innerRadius = 30;
      newElement.outerRadius = 70;
    } else if (shapeType === "ring") {
      newElement.innerRadius = 50;
      newElement.outerRadius = 100;
    }
    addElement(newElement);
  }

  function addElement(element) {
    const newElements = [...elements, element];
    setElements(newElements);
    addToHistory(newElements);
  }

  const handleElementChange = (id, newProps) => {
    const newElements = elements.map((elem) =>
      elem.elementId === id ? { ...elem, ...newProps } : elem
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const addToHistory = (newElements) => {
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryStep(newHistory?.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      setElements(history[historyStep - 1]);
    }
  };

  const redo = () => {
    if (historyStep < history?.length - 1) {
      setHistoryStep(historyStep + 1);
      setElements(history[historyStep + 1]);
    }
  };

  const handleDelete = () => {
    if (selectedId) {
      const newElements = elements.filter(
        (elem) => elem.elementId !== selectedId
      );
      setElements(newElements);
      setSelectedId(null);
      addToHistory(newElements);
    }
  };

  const handleDuplicate = () => {
    if (selectedId) {
      const elementToDuplicate = elements?.find(
        (elem) => elem.elementId === selectedId
      );
      const newElement = {
        ...elementToDuplicate,
        id: `ele-${uuidv4()}`,
        x: elementToDuplicate.x + 20,
        y: elementToDuplicate.y + 20,
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      setSelectedId(newElement.id);
      addToHistory(newElements);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => addImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const downloadCanvas = async () => {
    setSelectedId(null);
    const stage = stageRef.current;
    if (!stage) {
      console.error("Stage reference is missing");
      return;
    }
    const elements = stage?.find("Image, Rect, Text, Circle, RegularPolygon");
    if (!elements?.length) {
      Toast.error({ text: "No elements found to download" });
      return;
    }
    const imageNodes = elements.filter(
      (node) => node.getClassName() === "Image"
    );
    const loadImagesSafely = async () => {
      for (const node of imageNodes) {
        const img = node.getImage();
        if (!img) continue;
        console.log("imgSrc from download", img.src);
        const base64 = await loadImageAsBase64(img.src);
        if (!base64) continue;
        const newImg = document.createElement("img");
        newImg.src = base64;
        node.image(newImg);
      }
    };
    const scaleFactor = Number(downloadFormat?.fileSize) || 1;
    const stageWidth = stage.width();
    const stageHeight = stage.height();
    try {
      await loadImagesSafely();
      const mimeType =
        downloadFormat?.fileType === "jpg"
          ? "image/jpeg"
          : `image/${downloadFormat.fileType}`;
      const uri = stage.toDataURL({
        pixelRatio: scaleFactor,
        width: stageWidth,
        height: stageHeight,
        mimeType,
      });
      if (!uri) {
        Toast.error({
          text: "An error occured while processing the image.",
        });
        return;
      }
      const link = document.createElement("a");
      link.download = `${downloadFormat.fileName}.${downloadFormat.fileType}`;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      Toast.error({ text: "Failed to download canvas" });
      console.log("error", error);
    }
  };

  const selectedElement = elements?.find(
    (elem) => elem.elementId === selectedId
  );

  async function handleTemplatePoster() {
    setSelectedId(null);
    try {
      if (stageRef.current) {
        const dataURL = stageRef.current.toDataURL();
        console.log("dataUrl", dataURL);
        const compressedArrayBuffer = await compressFileForTemplatePoster(
          dataURL
        );
        const compressedFile = new Blob([compressedArrayBuffer], {
          type: "image/png",
        });
        console.log("compressedFile", compressedFile);
        const formImgData = new FormData();
        formImgData.append("uploaded_file", compressedFile);
        const { url, headers } = createUrl("api/upload-img");
        const res = await axios.post(url, formImgData, { headers });
        return res.data.imageUrl;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  //--------------------------api calls------------------------------------//

  async function publishTemplate() {
    setIsLoading(true);
    let tempPoster = await handleTemplatePoster();
    try {
      const imageData = elements?.filter(
        (el) =>
          el.type === "image" &&
          (el.src?.startsWith("data:image") || el.url?.startsWith("blob:"))
      );
      const uploadImages = await Promise.all(
        imageData?.map(async (el) => {
          let file;
          if (el.src?.startsWith("data:image")) {
            file = base64ToFile(el.src, el.name);
          } else if (el.url?.startsWith("blob:")) {
            file = await blobUrlToFile(el.url, el.name);
          }
          const compressedArrayBuffer = await compressFileForTemplatePoster(
            file
          );
          const compressedFile = new Blob([compressedArrayBuffer], {
            type: "image/png",
          });
          const formImgData = new FormData();
          formImgData.append("uploaded_file", compressedFile);
          const req = createUrl("api/upload-img");
          const res = await axios.post(req.url, formImgData, {
            headers: req.headers,
          });
          return { id: el.elementId, newSrc: res.data.imageUrl };
        })
      );
      const updatedElements = elements?.map((el) => {
        const matchedUpload = uploadImages?.find(
          (img) => img.id === el.elementId
        );
        return matchedUpload ? { ...el, src: matchedUpload.newSrc } : el;
      });
      setElements(updatedElements);
      const payload = {
        ...adData,
        isPublic: getUserCredentials()?.includes("questlabs") ? true : false,
        canvasSize: state?.canvasSize?.name,
        templatePoster: tempPoster,
        elements: updatedElements,
      };
      const reqData = createUrlBackend("template");
      const res = await axios.post(
        reqData.url,
        { payload },
        { headers: reqData.headers }
      );
      if (res.data.success) {
        setIsLoading(false);
        Toast.success({
          text: "Ad created successfully",
        });
        navigate("/myfiles?tab=favourite");
      }
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
      console.log("error", error.message);
    }
  }

  async function getTemplateData() {
    setIsLoading(true);
    try {
      const { url, headers } = createUrlBackend(`template/${templateId}`);
      const res = await axios.get(url, { headers });
      const data = res.data;
      setSelectedTemplate(data.data);
      setElements(data.data.elements);
      setHistory(data.data.elements);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error.message);
    }
  }
  useEffect(() => {
    if (templateId) {
      getTemplateData();
    }
  }, [templateId]);

  useEffect(() => {
    if (selectedTemplate) {
      dispatch({
        type: "user/adData",
        payload: { ...adData, title: selectedTemplate.title },
      });
    }
  }, [selectedTemplate]);

  async function updateTemplate() {
    setIsLoading(true);
    let tempPoster = await handleTemplatePoster();
    try {
      const imageData = elements?.filter(
        (el) =>
          el.type === "image" &&
          (el.src?.startsWith("data:image") || el.url?.startsWith("blob:"))
      );
      const uploadImages = await Promise.all(
        imageData?.map(async (el) => {
          let file;
          if (el.src?.startsWith("data:image")) {
            file = base64ToFile(el.src, el.name);
          } else if (el.url?.startsWith("blob:")) {
            file = await blobUrlToFile(el.url, el.name);
          }
          const compressedArrayBuffer = await compressFileForTemplatePoster(
            file
          );
          const compressedFile = new Blob([compressedArrayBuffer], {
            type: "image/png",
          });
          const formImgData = new FormData();
          formImgData.append("uploaded_file", compressedFile);
          const req = createUrl("api/upload-img");
          const res = await axios.post(req.url, formImgData, {
            headers: req.headers,
          });
          return { id: el.elementId, newSrc: res.data.imageUrl };
        })
      );
      const updatedElements = elements?.map((el) => {
        const matchedUpload = uploadImages?.find(
          (img) => img.id === el.elementId
        );
        return matchedUpload ? { ...el, src: matchedUpload.newSrc } : el;
      });
      const payload = {
        ...adData,
        templatePoster: tempPoster,
        elements: updatedElements,
        isPublic: getUserCredentials()?.includes("questlabs") ? true : false,
        canvasSize: state?.canvasSize?.name,
      };
      const reqData = createUrlBackend(`template/${templateId}`);
      const res = await axios.patch(
        reqData.url,
        { payload },
        { headers: reqData.headers }
      );
      if (res.data.success) {
        await getTemplateData();
        setIsLoading(false);
        navigate("/myfiles?tab=favourite");
        Toast.success({
          text: "Ad updated successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
      console.log("error", error.message);
    }
  }
  function shareToSocialMedia() {
    const dataURL = stageRef.current.toDataURL();
    const blob = dataURLtoBlob(dataURL);
    const file = new File([blob], "canvas.png", { type: "image/png" });

    const imageUrl = URL.createObjectURL(file);
    console.log("imgUrl", imageUrl);
    shareToSocial(imageUrl);
  }
  const shareToSocial = (imageUrl) => {
    let shareUrl = "";
    switch (socialMediaPlatForm) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
        // shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        //   imageUrl
        // )}`;
        break;
      case "reddit":
        shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
          imageUrl
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          imageUrl
        )}`;
        break;
      case "instagram":
        alert(
          "Instagram does not support direct web sharing. Download the image and upload manually."
        );
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "canvas.png";
        link.click();
        return;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };
  return (
    <div className="h-auto w-full flex flex-col justify-center items-center">
      {isLoading && <Loader />}
      <div className="w-full">
        <AdEditorTopBar
          onUndo={undo}
          onRedo={redo}
          canUndo={historyStep > 0}
          canRedo={historyStep < history?.length - 1}
          downloadCanvas={downloadCanvas}
          publishTemplate={publishTemplate}
          updateTemplate={updateTemplate}
          setDownLoadFormat={setDownLoadFormat}
          downloadFormat={downloadFormat}
          setSocialMediaPlatform={setSocialMediaPlatform}
          socialMediaPlatForm={socialMediaPlatForm}
          shareToSocialMedia={shareToSocialMedia}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      </div>

      <div className="w-full flex justify-between">
        <div className="flex w-fit p-4 justify-start gap-4">
          <div className="w-full max-w-[6.5rem] min-w-[6.5rem] p-3 bg-[#FAFAFA] flex items-center justify-center rounded-[0.25rem] h-full">
            <Toolbar
              onAddText={addText}
              toolbarSelectedElement={toolbarSelectedElement}
              handleToolBarClick={handleToolBarClick}
            />
          </div>
          {(toolbarSelectedElement === "media" ||
            toolbarSelectedElement === "elements" ||
            toolbarSelectedElement === "theme" ||
            toolbarSelectedElement === "chat") && (
            <div className="w-fit flex items-center justify-center">
              <SidePanel
                toolbarSelectedElement={toolbarSelectedElement}
                setElements={setElements}
                setHistory={setHistory}
                onAddShape={addShape}
                selectedElement={selectedElement}
              />
            </div>
          )}
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />

          {/* Canvas Area */}
          <div
            className="flex"
            style={{
              width: `${Number(canvasSize?.width)}px`,
              height: `${Number(canvasSize?.height)}px`,
            }}
          >
            <motion.div
              className={`bg-[#FAFAFA] rounded-lg`}
              animate={{
                width: canvasSize?.width,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                width: `${Number(canvasSize?.width)}px`,
                height: `${Number(canvasSize?.height)}px`,
              }}
            >
              <Stage
                width={Number(canvasSize?.width)}
                height={Number(canvasSize?.height)}
                ref={stageRef}
                onClick={(e) => {
                  if (e.target === e.target.getStage()) {
                    setSelectedId(null);
                  }
                }}
              >
                <Layer>
                  {elements?.map((elem) => {
                    if (elem.type === "image") {
                      return (
                        <CanvasImage
                          key={elem.elementId}
                          imageProps={elem}
                          isSelected={elem.elementId === selectedId}
                          onSelect={() => setSelectedId(elem.elementId)}
                          onChange={(newProps) =>
                            handleElementChange(elem.elementId, newProps)
                          }
                        />
                      );
                    }
                    if (elem.type === "text") {
                      return (
                        <CanvasText
                          key={elem.elementId}
                          textProps={elem}
                          isSelected={elem.elementId === selectedId}
                          onSelect={() => setSelectedId(elem.elementId)}
                          onChange={(newProps) =>
                            handleElementChange(elem.elementId, newProps)
                          }
                        />
                      );
                    }
                    return (
                      <CanvasShape
                        key={elem.elementId}
                        shapeProps={elem}
                        isSelected={elem.elementId === selectedId}
                        onSelect={() => setSelectedId(elem.elementId)}
                        onChange={(newProps) =>
                          handleElementChange(elem.elementId, newProps)
                        }
                      />
                    );
                  })}
                </Layer>
              </Stage>
            </motion.div>
          </div>
          {/* Right Property Panel */}
        </div>
        <div className="w-full max-w-[20rem] min-w-[20rem] bg-[#FAFAFA] flex items-center justify-center rounded-[0.25rem] h-full mt-4 mr-4">
          <PropertyPanel
            selectedElement={selectedElement}
            onChange={(newProps) => handleElementChange(selectedId, newProps)}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            selectedId={selectedId}
            setElements={setElements}
            setHistory={setHistory}
            elements={elements}
          />
        </div>
      </div>
    </div>
  );
};

export default AdEditor;
