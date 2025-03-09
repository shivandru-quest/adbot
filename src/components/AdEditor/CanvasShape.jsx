import { useEffect, useRef } from "react";
import {
  Rect,
  Circle,
  RegularPolygon,
  Transformer,
  Line,
  Circle as Point,
} from "react-konva";

const CanvasShape = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // const handlePointDrag = (index, e) => {
  //   const newPoints = [...shapeProps.points];
  //   newPoints[index * 2] = e.target.x();
  //   newPoints[index * 2 + 1] = e.target.y();
  //   onChange({ ...shapeProps, points: newPoints });
  // };
  const handlePointDrag = (index, e) => {
    const newPoints = [...shapeProps.points];
    const shapeX = shapeProps.x;
    const shapeY = shapeProps.y;

    newPoints[index * 2] = e.target.x() - shapeX; // Keep point relative to shape
    newPoints[index * 2 + 1] = e.target.y() - shapeY;

    onChange({ ...shapeProps, points: newPoints });
  };
  const renderShape = () => {
    const commonProps = {
      ref: shapeRef,
      ...shapeProps,
      onClick: onSelect,
      onTap: onSelect,
      draggable: true,
      onDragMove: (e) => {
        const dx = e.target.x() - shapeProps.x;
        const dy = e.target.y() - shapeProps.y;

        const newPoints = shapeProps.points.map((p, i) =>
          i % 2 === 0 ? p + dx : p + dy
        );

        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y(),
          points: newPoints,
        });
      },
      onDragEnd: (e) => {
        onChange({
          x: e.target.x(),
          y: e.target.y(),
        });
      },

      onTransformEnd: () => {
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const rotation = node.rotation();

        node.scaleX(1);
        node.scaleY(1);

        onChange({
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(5, node.height() * scaleY),
          rotation: rotation,
        });
      },
    };

    switch (shapeProps.shapeType) {
      case "rectangle":
        return <Rect {...commonProps} />;
      case "circle":
        return <Circle {...commonProps} radius={shapeProps.width / 2} />;
      case "hexagon":
        return (
          <RegularPolygon
            {...commonProps}
            sides={5}
            radius={shapeProps.width / 2}
          />
        );
      case "line":
        return (
          <>
            <Line {...commonProps} tension={0.3} />
            {shapeProps.points?.map((_, i) =>
              i % 2 === 0 ? (
                <Point
                  key={i}
                  x={shapeProps.x + shapeProps.points[i]}
                  y={shapeProps.y + shapeProps.points[i + 1]}
                  radius={5}
                  fill="transparent"
                  opacity={1}
                  hitStrokeWidth={10}
                  draggable
                  onDragMove={(e) => handlePointDrag(i / 2, e)}
                />
              ) : null
            )}
          </>
        );
      default:
        return <Rect {...commonProps} />;
    }
  };

  return (
    <>
      {renderShape()}
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            const minSize = 5;
            if (newBox.width < minSize || newBox.height < minSize) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default CanvasShape;
