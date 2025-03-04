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
} from "../../Config/generalFunctions";
import { mainConfig } from "../../Config/mainConfig";
import Loader from "../../ui/Loader";

const AdEditor = () => {
  const location = useLocation();
  const { templateId } = useParams();
  const { adData, formData } = location?.state || {};
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const stageRef = useRef(null);

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

  const downloadCanvas = () => {
    setSelectedId(null);
    setTimeout(() => {
      const stage = stageRef.current;
      const transformer = stage?.find("Transformer")[0];
      const elements = stage?.find("Image, Rect, Text, Circle, RegularPolygon");
      if (!elements?.length) return;

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

      const uri = stage.toDataURL({
        x: boundingBox.minX,
        y: boundingBox.minY,
        width: croppedWidth,
        height: croppedHeight,
      });

      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  const selectedElement = elements?.find(
    (elem) => elem.elementId === selectedId
  );

  //--------------------------api calls------------------------------------//

  const removeImgBackground = async () => {
    if (selectedElement && selectedElement?.type !== "image") return;
    try {
      const imgSrc = selectedElement?.src;
      if (!imgSrc) {
        console.log("no image selected");
        return;
      }
      const res = await fetch(imgSrc);
      const imgBlob = await res.blob();
      const formData = new FormData();
      formData.append("image_file", imgBlob, "image.png");
      const apiRes = await fetch(`https://api.pixian.ai/removebg`, {
        method: "POST",
        body: formData,
      });
      if (!apiRes.ok) {
        console.error("Background removal failed", apiRes.statusText);
        return;
      }
      const resultBlod = await apiRes.blob();
      const resultUrl = URL.createObjectURL(resultBlod);
      selectedElement.src = resultUrl;
    } catch (error) {
      console.log("error", error.message);
    }
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
      const res = await axios.post(
        `https://addons.questprotocol.xyz/api/adbot/template`,
        {
          payload,
        },
        {
          headers: {
            "Content-Type": "application/json",
            entityId: mainConfig.QUEST_ADDBOT_ENTITY_ID,
            userId: getUserId(),
            token: getToken(),
          },
        }
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
      const res = await axios.get(
        `https://addons.questprotocol.xyz/api/adbot/template/${templateId}`,
        {
          headers: {
            "Content-Type": "application/json",
            entityId: mainConfig.QUEST_ADDBOT_ENTITY_ID,
            userId: getUserId(),
            token: getToken(),
          },
        }
      );
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

  return (
    <div className="flex h-screen bg-gray-100 ml-[275px]">
      {/* Left Toolbar */}
      {isLoading && <Loader />}
      <div className="w-16 bg-white border-r border-gray-200">
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
        />
      </div>

      <input
        type="file"
        id="imageUpload"
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {/* Canvas Area */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-lg w-[800px]">
          <Stage
            width={800}
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
        </div>
        <div className="w-full flex justify-center">
          <button
            className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            onClick={publishTemplate}
            // onClick={downloadCanvas}
          >
            Publish Template
          </button>
        </div>
      </div>

      {/* Right Property Panel */}
      <PropertyPanel
        selectedElement={selectedElement}
        onChange={(newProps) => handleElementChange(selectedId, newProps)}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onDownload={downloadCanvas}
      />
    </div>
  );
};

export default AdEditor;
