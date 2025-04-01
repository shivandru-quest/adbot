import { useEffect, useRef } from "react";
import {
  Rect,
  Circle,
  RegularPolygon,
  Transformer,
  Line,
  Circle as Point,
  Star,
  Ring,
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

  const renderShape = () => {
    const commonProps = {
      ref: shapeRef,
      ...shapeProps,
      onClick: onSelect,
      onTap: onSelect,
      draggable: true,
      // onDragMove: (e) => {
      //   const dx = e.target.x() - shapeProps.x;
      //   const dy = e.target.y() - shapeProps.y;

      //   const newPoints = shapeProps.points.map((p, i) =>
      //     i % 2 === 0 ? p + dx : p + dy
      //   );

      //   onChange({
      //     ...shapeProps,
      //     x: e.target.x(),
      //     y: e.target.y(),
      //     points: newPoints,
      //   });
      // },
      onDragEnd: (e) => {
        onChange({
          x: e.target.x(),
          y: e.target.y(),
        });
      },

      // onTransformEnd: () => {
      //   const node = shapeRef.current;
      //   const scaleX = node.scaleX();
      //   const scaleY = node.scaleY();
      //   const rotation = node.rotation();

      //   node.scaleX(1);
      //   node.scaleY(1);

      //   onChange({
      //     x: node.x(),
      //     y: node.y(),
      //     width: Math.max(5, node.width() * scaleX),
      //     height: Math.max(5, node.height() * scaleY),
      //     rotation: rotation,
      //   });
      // },
      onTransformEnd: () => {
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const rotation = node.rotation();

        // Reset scale to avoid cumulative scaling issues
        node.scaleX(1);
        node.scaleY(1);

        const updatedShape = {
          x: node.x(),
          y: node.y(),
          rotation,
        };

        if (shapeProps.shapeType === "rectangle" && shapeProps.cornerRadius) {
          const scale = (scaleX + scaleY) / 2;
          updatedShape.width = Math.max(5, node.width() * scaleX);
          updatedShape.height = Math.max(5, node.height() * scaleY);
          updatedShape.cornerRadius = Math.max(
            2,
            shapeProps.cornerRadius * scale
          );
        } else if (
          shapeProps.shapeType === "star" ||
          shapeProps.shapeType === "ring"
        ) {
          const scale = (scaleX + scaleY) / 2;

          updatedShape.innerRadius = Math.max(
            5,
            shapeProps.innerRadius * scale
          );
          updatedShape.outerRadius = Math.max(
            10,
            shapeProps.outerRadius * scale
          );
        } else {
          updatedShape.width = Math.max(5, node.width() * scaleX);
          updatedShape.height = Math.max(5, node.height() * scaleY);
        }

        onChange(updatedShape);
      },
    };

    switch (shapeProps.shapeType) {
      case "rectangle":
        return <Rect {...commonProps} />;
      case "circle":
        return <Circle {...commonProps} radius={shapeProps.width / 2} />;
      case "pentagon":
        return (
          <RegularPolygon
            {...commonProps}
            sides={5}
            radius={shapeProps.width / 2}
          />
        );
      case "hexagon":
        return (
          <RegularPolygon
            {...commonProps}
            sides={6}
            radius={shapeProps.width / 2}
          />
        );
      case "star":
        return (
          <Star
            {...commonProps}
            innerRadius={shapeProps.innerRadius}
            outerRadius={shapeProps.outerRadius}
          />
        );
      case "ring":
        return (
          <Ring
            {...commonProps}
            innerRadius={shapeProps.innerRadius}
            outerRadius={shapeProps.outerRadius}
          />
        );
      case "octagon":
        return (
          <RegularPolygon
            {...commonProps}
            sides={8}
            radius={shapeProps.width / 2}
          />
        );
      case "line":
        return <Line {...commonProps} tension={0.5} closed strokeWidth={4} />;
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
