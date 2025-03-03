import { Stage, Layer } from 'react-konva';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiImage, FiType, FiGrid, FiLayers, FiDownload } from 'react-icons/fi';
import CanvasImage from './CanvasImage';
import CanvasText from './CanvasText';
import ToolbarButton from './ToolbarButton';

const CanvasEditor = () => {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const stageRef = useRef(null);

  const addImage = (url) => {
    setElements([
      ...elements,
      {
        id: Date.now(),
        type: 'image',
        src: url,
        x: 100,
        y: 100,
        width: 200,
        height: 200,
      },
    ]);
  };

  const addText = () => {
    setElements([
      ...elements,
      {
        id: Date.now(),
        type: 'text',
        text: 'Double click to edit',
        x: 100,
        y: 100,
        fontSize: 20,
        fill: '#000000',
        width: 200,
      },
    ]);
  };

  const handleElementChange = (id, newProps) => {
    setElements(
      elements.map((elem) => (elem.id === id ? { ...elem, ...newProps } : elem))
    );
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
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Toolbar */}
      <div className="w-16 bg-white shadow-sm flex flex-col items-center py-4 space-y-4">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageUpload"
          onChange={handleImageUpload}
        />
        <ToolbarButton
          Icon={FiImage}
          label="Add Image"
          onClick={() => document.getElementById('imageUpload').click()}
        />
        <ToolbarButton Icon={FiType} label="Add Text" onClick={addText} />
        <ToolbarButton Icon={FiGrid} label="Grid" />
        <ToolbarButton Icon={FiLayers} label="Layers" />
        <ToolbarButton Icon={FiDownload} label="Download" onClick={downloadCanvas} />
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
              {elements.map((elem) => {
                if (elem.type === 'image') {
                  return (
                    <CanvasImage
                      key={elem.id}
                      imageProps={elem}
                      isSelected={elem.id === selectedId}
                      onSelect={() => setSelectedId(elem.id)}
                      onChange={(newProps) => handleElementChange(elem.id, newProps)}
                    />
                  );
                }
                return (
                  <CanvasText
                    key={elem.id}
                    textProps={elem}
                    isSelected={elem.id === selectedId}
                    onSelect={() => setSelectedId(elem.id)}
                    onChange={(newProps) => handleElementChange(elem.id, newProps)}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;