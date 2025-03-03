import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorPalette = ({ brandColors, setBrandColors, backgroundColor, setBackgroundColor }) => {
  const [activeColor, setActiveColor] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (color) => {
    if (activeColor === 'background') {
      setBackgroundColor(color);
    } else if (activeColor) {
      setBrandColors(prev => ({
        ...prev,
        [activeColor]: color
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Brand Colors</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(brandColors).map(([key, color]) => (
            <button
              key={key}
              onClick={() => {
                setActiveColor(key);
                setShowPicker(true);
              }}
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
            >
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm capitalize">{key}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Background</h3>
        <button
          onClick={() => {
            setActiveColor('background');
            setShowPicker(true);
          }}
          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 w-full"
        >
          <div
            className="w-6 h-6 rounded"
            style={{ backgroundColor }}
          />
          <span className="text-sm">Background Color</span>
        </button>
      </div>

      {showPicker && (
        <div className="mt-4">
          <HexColorPicker
            color={activeColor === 'background' ? backgroundColor : brandColors[activeColor]}
            onChange={handleColorChange}
          />
          <button
            onClick={() => setShowPicker(false)}
            className="mt-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            Close Picker
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;