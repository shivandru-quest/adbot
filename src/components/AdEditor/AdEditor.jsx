import { useState, useRef, useEffect, useContext } from "react";
import { Stage, Layer } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import CanvasImage from "../Canvas/CanvasImage";
import CanvasText from "../Canvas/CanvasText";
import CanvasShape from "./CanvasShape";
import Toolbar from "./Toolbar";
import PropertyPanel from "./PropertyPanel";
import { useParams, useLocation } from "react-router-dom";
import { Toast } from "@questlabs/react-sdk";
import axios from "axios";
import {
  createUrl,
  base64ToFile,
  blobUrlToFile,
  getUserId,
  getToken,
  createUrlBackend,
} from "../../Config/generalFunctions";
import { mainConfig } from "../../Config/mainConfig";
import Loader from "../../ui/Loader";
import AdEditorTopBar from "../../ui/AdEditorTopBar";
import { motion } from "framer-motion";
import SidePanel from "../../ui/SidePanel";
const MAX_IMAGE_SIZE = 0.5 * 1024 * 1024;

const AdEditor = () => {
  const location = useLocation();
  const { templateId } = useParams();
  const { adData, formData } = location?.state || {};
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [toolbarSelectedElement, setToolbarSelectedElement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stageRef = useRef(null);

  console.log("elements", elements);

  useEffect(() => {
    if (adData?.images?.length > 0) {
      setElements((prev) => {
        const existingElements = new Set(prev.map((el) => el.elementId));
        const uniqueElements = adData.images.filter(
          (el) => !existingElements.has(el.elementId)
        );
        return [...prev, ...uniqueElements];
      });
      setHistory((prev) => {
        const existingElements = new Set(prev.map((el) => el.elementId));
        const uniqueElements = adData.images.filter(
          (el) => !existingElements.has(el.elementId)
        );
        return [...prev, ...uniqueElements];
      });
    }
  }, [adData]);

  const addImage = (url) => {
    const newElement = {
      elementId: `ele-${uuidv4()}`,
      type: "image",
      src: url,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    };
    addElement(newElement);
  };

  const addText = () => {
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
    };
    addElement(newElement);
  };

  const addShape = (shapeType) => {
    const newElement = {
      elementId: `ele-${uuidv4()}`,
      type: "shape",
      shapeType,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      points: [0, 0, 100, 0, 100, 100],
      fill: "#e3e3e3",
      stroke: "#000000",
      strokeWidth: 2,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    };
    addElement(newElement);
  };

  const addElement = (element) => {
    const newElements = [...elements, element];
    setElements(newElements);
    addToHistory(newElements);
  };

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

        const newImg = new window.Image();
        newImg.crossOrigin = "Anonymous";
        newImg.src = img.src;

        await new Promise((resolve, reject) => {
          newImg.onload = resolve;
          newImg.onerror = reject;
        });

        node.image(newImg);
      }
    };
    try {
      await loadImagesSafely();
      const boundingBox = elements.reduce(
        (box, node) => {
          const { x, y, width, height } = node.getClientRect();
          return {
            minX: Math.min(box.minX, x),
            minY: Math.min(box.minY, y),
            maxX: Math.max(box.maxX, x + width),
            maxY: Math.max(box.maxY, y + height),
          };
        },
        { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
      );

      const croppedWidth = boundingBox.maxX - boundingBox.minX;
      const croppedHeight = boundingBox.maxY - boundingBox.minY;
      if (croppedWidth <= 0 || croppedHeight <= 0) {
        console.error("Invalid width/height for export", {
          croppedWidth,
          croppedHeight,
        });
        Toast.error({ text: "Canvas is empty or has invalid dimensions" });
        return;
      }
      const uri = stage.toDataURL({
        x: boundingBox.minX,
        y: boundingBox.minY,
        width: croppedWidth,
        height: croppedHeight,
        mimeType: "image/png",
      });

      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      Toast.error({ text: "Failed to download canvas" });
    }
  };

  const selectedElement = elements?.find(
    (elem) => elem.elementId === selectedId
  );

  //--------------------------api calls------------------------------------//

  const removeImgBackground = async () => {
    Toast.info({ text: "Feature Included In Paid Plan Only...!" });
  };

  async function publishTemplate() {
    setIsLoading(true);
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
          if (file.size > MAX_IMAGE_SIZE) {
            setIsLoading(false);
            Toast.error({
              text: "Image size should be less than 500 KB",
            });
            return;
          }
          const formImgData = new FormData();
          formImgData.append("uploaded_file", file);
          const { url, headers } = createUrl("api/upload-img");
          const res = await axios.post(url, formImgData, { headers });
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
        images: undefined,
        elements: updatedElements,
      };
      const reqData = createUrlBackend();
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
      const { url, headers } = createUrlBackend(`${templateId}`);
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

  async function updateTemplate() {
    setIsLoading(true);
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
          if (file.size > MAX_IMAGE_SIZE) {
            setIsLoading(false);
            Toast.error({
              text: "Image size should be less than 500 KB",
            });
            return;
          }
          const formImgData = new FormData();
          formImgData.append("uploaded_file", file);
          const { url, headers } = createUrl("api/upload-img");
          const res = await axios.post(url, formImgData, { headers });
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
        ...formData,
        elements: updatedElements,
      };
      const reqData = createUrlBackend(`${templateId}`);
      const res = await axios.patch(
        reqData.url,
        { payload },
        { headers: reqData.headers }
      );
      if (res.data.success) {
        await getTemplateData();
        setIsLoading(false);
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
        />
      </div>
      <div className="flex w-full p-4 justify-between gap-4">
        <div className="w-[6.5rem] min-w-[6.5rem] p-3 bg-[#FAFAFA] flex items-center justify-center rounded-[0.25rem]">
          <Toolbar
            onAddImage={() => document.getElementById("imageUpload").click()}
            onAddText={addText}
            onAddShape={addShape}
            onUndo={undo}
            onRedo={redo}
            canUndo={historyStep > 0}
            canRedo={historyStep < history?.length - 1}
            removeBackground={removeImgBackground}
            downloadCanvas={downloadCanvas}
            setSelectedId={setSelectedId}
            setToolbarSelectedElement={setToolbarSelectedElement}
            toolbarSelectedElement={toolbarSelectedElement}
          />
        </div>
        {(toolbarSelectedElement === "media" ||
          toolbarSelectedElement === "elements" ||
          toolbarSelectedElement === "theme") && (
          <SidePanel
            toolbarSelectedElement={toolbarSelectedElement}
            setElements={setElements}
            setHistory={setHistory}
            onAddShape={addShape}
            selectedElement={selectedElement}
          />
        )}
        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Canvas Area */}
        <div className="flex flex-1">
          <motion.div
            className={`bg-[#FAFAFA] rounded-lg`}
            animate={{
              width:
                selectedElement ||
                (toolbarSelectedElement !== "text" &&
                  toolbarSelectedElement !== null)
                  ? 1050
                  : 1300,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Stage
              width={
                selectedElement ||
                (toolbarSelectedElement !== "text" &&
                  toolbarSelectedElement !== null)
                  ? 1050
                  : 1300
              }
              height={600}
              ref={stageRef}
              onClick={(e) => {
                if (e.target === e.target.getStage()) {
                  setSelectedId(null);
                }
              }}
            >
              <Layer>
                {elements?.map((elem, i) => {
                  if (elem.type === "image") {
                    return (
                      <CanvasImage
                        key={i}
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
                        key={elem.id}
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
                      key={elem.id}
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
          {/* <div className="w-full flex justify-center">
            <button
              className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              onClick={templateId ? updateTemplate : publishTemplate}
            >
              {templateId ? "Edit Template" : "Publish Template"}
            </button>
          </div> */}
        </div>

        {/* Right Property Panel */}
        <PropertyPanel
          selectedElement={selectedElement}
          onChange={(newProps) => handleElementChange(selectedId, newProps)}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onDownload={downloadCanvas}
          setSelectedId={setSelectedId}
        />
      </div>
    </div>
  );
};

export default AdEditor;
