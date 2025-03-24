import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import { FiTrash2 } from "react-icons/fi";
import AllSvgs from "../../assets/AllSvgs";
import ReactSelect from "../../ui/ReactSelect";

const fontOptions = [
  { value: "Arial", label: "Arial" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
  { value: "Trebuchet MS", label: "Trebuchet MS" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Impact", label: "Impact" },
  { value: "Tahoma", label: "Tahoma" },
  { value: "Lucida Console", label: "Lucida Console" },
  { value: "Poppins", label: "Poppins" },
  { value: "Roboto", label: "Roboto" },
  { value: "Lato", label: "Lato" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Raleway", label: "Raleway" },
  { value: "Playfair Display", label: "Playfair Display" },
  { value: "Merriweather", label: "Merriweather" },
  { value: "Ubuntu", label: "Ubuntu" },
];

const PropertyPanel = ({
  selectedElement,
  onChange,
  onDelete,
  onDuplicate,
  setHistory,
  setElements,
  selectedId,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState(selectedElement?.fill || "");
  const [customOpacity, setCustomOpacity] = useState("1");

  useEffect(() => {
    if (selectedElement) {
      if (selectedElement.type === "shape") {
        setElements((prev) =>
          prev.map((el) =>
            el.elementId === selectedId ? { ...el, fill: customColor } : el
          )
        );
        setHistory((prev) =>
          prev.map((el) =>
            el.elementId === selectedId ? { ...el, fill: customColor } : el
          )
        );
      } else if (selectedElement.type === "text") {
        setElements((prev) =>
          prev.map((el) =>
            el.elementId === selectedId ? { ...el, fill: customColor } : el
          )
        );
        setHistory((prev) =>
          prev.map((el) =>
            el.elementId === selectedId ? { ...el, fill: customColor } : el
          )
        );
      }
    }
  }, [customColor, selectedElement]);

  useEffect(() => {
    if (selectedElement && customOpacity) {
      if (selectedElement.type === "shape") {
        setElements((prev) =>
          prev.map((el) =>
            el.elementId === selectedId
              ? { ...el, opacity: parseFloat(customOpacity || 1) }
              : el
          )
        );
        setHistory((prev) =>
          prev.map((el) =>
            el.elementId === selectedId
              ? { ...el, opacity: parseFloat(customOpacity || 1) }
              : el
          )
        );
      } else if (selectedElement.type === "text") {
        setElements((prev) =>
          prev.map((el) =>
            el.elementId === selectedId
              ? { ...el, opacity: parseFloat(customOpacity || 1) }
              : el
          )
        );
        setHistory((prev) =>
          prev.map((el) =>
            el.elementId === selectedId
              ? { ...el, opacity: parseFloat(customOpacity || 1) }
              : el
          )
        );
      }
    }
  }, [selectedElement, customOpacity]);

  function handleColorPicker() {
    setShowColorPicker(!showColorPicker);
  }

  return (
    selectedElement && (
      <div className="w-80 flex flex-col gap-5 bg-[#FAFAFA] rounded overflow-y-auto h-[calc(100vh-6rem)]">
        <div className="flex justify-between items-center py-[1.125rem] px-[1rem] border-b border-[#E2E2E2]">
          <h3 className="font-semibold text-[#181818] text-base">Properties</h3>
          <div className="flex space-x-3 items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDuplicate}
              className=" w-3 h-3"
            >
              <AllSvgs type={"copyIcon"} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="w-3 h-3 text-red-500"
            >
              <FiTrash2 style={{ width: "100%", height: "100%" }} />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center w-full gap-5 p-4">
          {/* Position */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-[#181818">
              Position
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-[#535353] font-[500]">X</label>
                <input
                  type="number"
                  value={Math.round(selectedElement.x)}
                  onChange={(e) => onChange({ x: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#E2E2E2] rounded-md outline-none text-sm font-[500] text-[#696969]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-[#535353] font-[500]">Y</label>
                <input
                  type="number"
                  value={Math.round(selectedElement.y)}
                  onChange={(e) => onChange({ y: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#E2E2E2] rounded-md outline-none text-sm font-[500] text-[#696969]"
                />
              </div>
            </div>
          </div>

          {/* Size */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-[#181818]">
              Size
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-[#535353] font-[500]">
                  Width
                </label>
                <input
                  type="number"
                  value={Math.round(selectedElement.width)}
                  onChange={(e) =>
                    onChange({ width: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-[#E2E2E2] rounded-md outline-none text-sm font-[500] text-[#696969]"
                />
              </div>
              <div>
                <label className="text-xs text-[#535353] font-[500]">
                  Height
                </label>
                <input
                  type="number"
                  value={Math.round(selectedElement.height)}
                  onChange={(e) =>
                    onChange({ height: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-[#E2E2E2] rounded-md outline-none text-sm font-[500] text-[#696969]"
                />
              </div>
            </div>
          </div>

          {/* Rotation */}
          <div className="w-full flex flex-col gap-2">
            <label className="block text-sm font-medium text-[#181818]">
              Rotation
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={selectedElement.rotation || 0}
              onChange={(e) => onChange({ rotation: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Text-specific properties */}
          {selectedElement.type === "text" && (
            <>
              <div className="w-full flex flex-col gap-1">
                <label className="block text-sm font-medium text-[#181818]">
                  Text
                </label>
                <textarea
                  value={selectedElement.text}
                  onChange={(e) => onChange({ text: e.target.value })}
                  className="w-full px-3 py-2 border border-solid border-[#E2E2E2] rounded-md text-[#696969] text-sm font-[500] outline-none h-14"
                  rows="2"
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="block text-sm font-medium text-[#181818]">
                  Font
                </label>
                <ReactSelect
                  options={fontOptions}
                  value={
                    fontOptions.find(
                      (option) => option.value === selectedElement.fontFamily
                    ) || null
                  }
                  onChange={(e) => onChange({ fontFamily: e.value })}
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="block text-sm font-medium text-[#181818]">
                  Font Size
                </label>
                <input
                  type="number"
                  value={selectedElement.fontSize}
                  onChange={(e) =>
                    onChange({ fontSize: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-[#E2E2E2] rounded-md outline-none text-sm font-[500] text-[#696969]"
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="block text-sm font-medium text-[#181818]">
                  Style
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      onChange({
                        fontStyle:
                          selectedElement.fontStyle === "bold"
                            ? "normal"
                            : "bold",
                      })
                    }
                    className={`py-2 px-3 rounded-md border border-[#E2E2E2] ${
                      selectedElement.fontStyle === "bold"
                        ? "bg-indigo-100 text-indigo-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <AllSvgs type={"boldIcon"} />
                  </button>
                  <button
                    onClick={() =>
                      onChange({
                        fontStyle:
                          selectedElement.fontStyle === "italic"
                            ? "normal"
                            : "italic",
                      })
                    }
                    className={`py-2 px-3 rounded-md border border-[#E2E2E2] ${
                      selectedElement.fontStyle === "italic"
                        ? "bg-indigo-100 text-indigo-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <AllSvgs type={"italicIcon"} />
                  </button>
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="block text-sm font-medium text-[#181818]">
                  Alignment
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onChange({ align: "left" })}
                    className={`py-2 px-3 rounded-md border border-[#E2E2E2] ${
                      selectedElement.align === "left"
                        ? "bg-indigo-100 text-indigo-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <AllSvgs type={"leftAlignmentIcon"} />
                  </button>
                  <button
                    onClick={() => onChange({ align: "center" })}
                    className={`py-2 px-3 rounded-md border border-[#E2E2E2] ${
                      selectedElement.align === "center"
                        ? "bg-indigo-100 text-indigo-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <AllSvgs type={"centerAlignmentIcon"} />
                  </button>
                  <button
                    onClick={() => onChange({ align: "right" })}
                    className={`py-2 px-3 rounded-md border border-[#E2E2E2] ${
                      selectedElement.align === "right"
                        ? "bg-indigo-100 text-indigo-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <AllSvgs type={"rightAlignmentIcon"} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Color picker */}

          <div className="w-full flex flex-col gap-3">
            <label className="block text-sm font-medium text-[#181818]">
              Color
            </label>
            <div
              className="w-full h-10 rounded cursor-pointer"
              style={{
                backgroundColor:
                  customColor || selectedElement?.fill || "#E2E2E2",
              }}
              onClick={handleColorPicker}
            />
            {showColorPicker && selectedElement.type === "shape" && (
              <div className="absolute mt-2 bottom-1 right-72">
                <HexColorPicker
                  color={customColor}
                  onChange={(color) => setCustomColor(color)}
                />
              </div>
            )}
            {showColorPicker && selectedElement.type === "text" && (
              <div className="absolute mt-2 bottom-1 right-72">
                <HexColorPicker
                  color={customColor}
                  onChange={(color) => setCustomColor(color)}
                />
              </div>
            )}
            {(selectedElement.type === "shape" ||
              selectedElement.type === "text") && (
              <div className="w-full flex items-center gap-5">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="overlayColor"
                    className="text-[#535353] text-xs font-[500] block"
                  >
                    Overlay color
                  </label>
                  <input
                    type="text"
                    name="customColor"
                    id="customColor"
                    placeholder="Enter Hex code"
                    className="px-3 py-2 rounded-md border border-[#979797] text-[#535353] text-ellipsis overflow-hidden whitespace-nowrap font-[500] text-sm placeholder:text-[#696969] placeholder:text-sm placeholder:font-[400] h-9 w-28 outline-none"
                    onChange={(e) => setCustomColor(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="opacity"
                    className="text-[#535353] text-xs font-[500] block"
                  >
                    Opacity
                  </label>
                  <input
                    type="text"
                    name="opacity"
                    id="opacity"
                    placeholder="For eg. 20%"
                    className="px-3 py-2 rounded-md border border-[#979797] text-[#535353] text-ellipsis overflow-hidden whitespace-nowrap font-[500] text-sm placeholder:text-[#696969] placeholder:text-sm placeholder:font-[400] h-9 w-28 outline-none"
                    onChange={(e) => setCustomOpacity(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {selectedElement.type === "shape" && (
          <div className="w-full flex flex-col gap-2 p-4">
            <span className="text-[#181818] text-sm font-[500]">
              Border radius
            </span>
            <div className="w-full flex items-center justify-between gap-4">
              <button
                className="px-3 py-2 rounded-md border border-[#B0B0B0] flex items-center justify-center text-[#535353] text-sm font-[500] w-[3.45rem]"
                onClick={() => (selectedElement.cornerRadius = 4)}
              >
                4
              </button>
              <button
                className="px-3 py-2 rounded-md border border-[#B0B0B0] flex items-center justify-center text-[#535353] text-sm font-[500] w-[3.45rem]"
                onClick={() => (selectedElement.cornerRadius = 8)}
              >
                8
              </button>
              <button
                className="px-3 py-2 rounded-md border border-[#B0B0B0] flex items-center justify-center text-[#535353] text-sm font-[500] w-[3.45rem]"
                onClick={() => (selectedElement.cornerRadius = 12)}
              >
                12
              </button>
              <button
                className="px-3 py-2 rounded-md border border-[#B0B0B0] flex items-center justify-center text-[#535353] text-sm font-[500] w-[3.45rem]"
                onClick={() => (selectedElement.cornerRadius = 16)}
              >
                16
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default PropertyPanel;
