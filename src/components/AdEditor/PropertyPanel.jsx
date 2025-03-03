import { motion } from "framer-motion";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  FiTrash2,
  FiCopy,
  FiDownload,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiBold,
  FiItalic,
} from "react-icons/fi";

const PropertyPanel = ({
  selectedElement,
  onChange,
  onDelete,
  onDuplicate,
  onDownload,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  if (!selectedElement) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 p-4">
        <p className="text-gray-500 text-center">
          Select an element to edit its properties
        </p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Properties</h3>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDuplicate}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <FiCopy />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="p-2 hover:bg-gray-100 rounded text-red-500"
          >
            <FiTrash2 />
          </motion.button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500">X</label>
              <input
                type="number"
                value={Math.round(selectedElement.x)}
                onChange={(e) => onChange({ x: parseInt(e.target.value) })}
                className="w-full p-1 border rounded"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Y</label>
              <input
                type="number"
                value={Math.round(selectedElement.y)}
                onChange={(e) => onChange({ y: parseInt(e.target.value) })}
                className="w-full p-1 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500">Width</label>
              <input
                type="number"
                value={Math.round(selectedElement.width)}
                onChange={(e) => onChange({ width: parseInt(e.target.value) })}
                className="w-full p-1 border rounded"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Height</label>
              <input
                type="number"
                value={Math.round(selectedElement.height)}
                onChange={(e) => onChange({ height: parseInt(e.target.value) })}
                className="w-full p-1 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Rotation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text
              </label>
              <textarea
                value={selectedElement.text}
                onChange={(e) => onChange({ text: e.target.value })}
                className="w-full p-2 border rounded"
                rows="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font
              </label>
              <select
                value={selectedElement.fontFamily}
                onChange={(e) => onChange({ fontFamily: e.target.value })}
                // size={5}
                className="w-full p-2 border rounded outline-none"
              >
                <option value="Arial" style={{ fontFamily: "Arial" }}>
                  Arial
                </option>
                <option
                  value="Times New Roman"
                  style={{ fontFamily: "Times New Roman" }}
                >
                  Times New Roman
                </option>
                <option
                  value="Courier New"
                  style={{ fontFamily: "Courier New" }}
                >
                  Courier New
                </option>
                <option value="Georgia" style={{ fontFamily: "Georgia" }}>
                  Georgia
                </option>
                <option value="Verdana" style={{ fontFamily: "Verdana" }}>
                  Verdana
                </option>
                <option
                  value="Trebuchet MS"
                  style={{ fontFamily: "Trebuchet MS" }}
                >
                  Trebuchet MS
                </option>
                <option
                  value="Comic Sans MS"
                  style={{ fontFamily: "Comic Sans MS" }}
                >
                  Comic Sans MS
                </option>
                <option value="Impact" style={{ fontFamily: "Impact" }}>
                  Impact
                </option>
                <option value="Tahoma" style={{ fontFamily: "Tahoma" }}>
                  Tahoma
                </option>
                <option
                  value="Lucida Console"
                  style={{ fontFamily: "Lucida Console" }}
                >
                  Lucida Console
                </option>
                <option value="Poppins" style={{ fontFamily: "Poppins" }}>
                  Poppins
                </option>
                <option value="Roboto" style={{ fontFamily: "Roboto" }}>
                  Roboto
                </option>
                <option value="Lato" style={{ fontFamily: "Lato" }}>
                  Lato
                </option>
                <option value="Open Sans" style={{ fontFamily: "Open Sans" }}>
                  Open Sans
                </option>
                <option value="Montserrat" style={{ fontFamily: "Montserrat" }}>
                  Montserrat
                </option>
                <option value="Raleway" style={{ fontFamily: "Raleway" }}>
                  Raleway
                </option>
                <option
                  value="Playfair Display"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  Playfair Display
                </option>
                <option
                  value="Merriweather"
                  style={{ fontFamily: "Merriweather" }}
                >
                  Merriweather
                </option>
                <option value="Ubuntu" style={{ fontFamily: "Ubuntu" }}>
                  Ubuntu
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Size
              </label>
              <input
                type="number"
                value={selectedElement.fontSize}
                onChange={(e) =>
                  onChange({ fontSize: parseInt(e.target.value) })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  className={`p-2 rounded ${
                    selectedElement.fontStyle === "bold"
                      ? "bg-indigo-100 text-indigo-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiBold />
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
                  className={`p-2 rounded ${
                    selectedElement.fontStyle === "italic"
                      ? "bg-indigo-100 text-indigo-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiItalic />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alignment
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => onChange({ align: "left" })}
                  className={`p-2 rounded ${
                    selectedElement.align === "left"
                      ? "bg-indigo-100 text-indigo-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiAlignLeft />
                </button>
                <button
                  onClick={() => onChange({ align: "center" })}
                  className={`p-2 rounded ${
                    selectedElement.align === "center"
                      ? "bg-indigo-100 text-indigo-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiAlignCenter />
                </button>
                <button
                  onClick={() => onChange({ align: "right" })}
                  className={`p-2 rounded ${
                    selectedElement.align === "right"
                      ? "bg-indigo-100 text-indigo-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiAlignRight />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Color picker */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <div
            className="w-full h-10 rounded cursor-pointer"
            style={{
              backgroundColor: selectedElement.fill || selectedElement.color,
            }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          />
          {showColorPicker && selectedElement.type === "shape" && (
            <div className="absolute mt-2 bottom-1 right-72">
              <HexColorPicker
                color={selectedElement.fill || "#ffffff"}
                onChange={(color) => {
                  onChange({ fill: color });
                }}
              />
            </div>
          )}
          {showColorPicker && selectedElement.type === "text" && (
            <div className="absolute mt-2 bottom-1 right-72">
              <HexColorPicker
                color={selectedElement.color || "#000000"}
                onChange={(color) => {
                  onChange({ fill: color });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;
