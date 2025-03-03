import { Text, Transformer } from 'react-konva';
import { useEffect, useRef, useState } from 'react';

const CanvasText = ({ textProps, isSelected, onSelect, onChange }) => {
  const textRef = useRef();
  const trRef = useRef();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isSelected && !isEditing) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, isEditing]);

  const handleDblClick = () => {
    setIsEditing(true);
    const textNode = textRef.current;
    const textPosition = textNode.getAbsolutePosition();
    const stageBox = textNode.getStage().container().getBoundingClientRect();

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.top = `${stageBox.top + textPosition.y}px`;
    textarea.style.left = `${stageBox.left + textPosition.x}px`;
    textarea.style.width = `${textNode.width() - textNode.padding() * 2}px`;
    textarea.style.height = `${textNode.height() - textNode.padding() * 2}px`;
    textarea.style.fontSize = `${textNode.fontSize()}px`;
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();

    textarea.focus();

    textarea.addEventListener('blur', () => {
      const newText = textarea.value;
      document.body.removeChild(textarea);
      setIsEditing(false);
      onChange({ text: newText, visible: true });
    });
  };

  return (
    <>
      <Text
        ref={textRef}
        {...textProps}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        visible={!isEditing}
        onDblClick={handleDblClick}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = textRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            fontSize: textProps.fontSize * scaleY,
          });
        }}
      />
      {isSelected && !isEditing && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            const minWidth = 5;
            const minHeight = 5;
            if (newBox.width < minWidth || newBox.height < minHeight) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default CanvasText;