import { useEffect, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";
import { compressImage } from "../../Config/generalFunctions";
const CanvasImage = ({ imageProps, isSelected, onSelect, onChange }) => {
  const imageRef = useRef();
  const trRef = useRef();
  const [compressedImage, setCompressedImage] = useState(null);
  const [image] = useImage(compressedImage);

  useEffect(() => {
    async function compress() {
      if (!imageProps.src) return;
      console.log("imageProps.src", imageProps.src);
      if (imageProps.src.includes("https://quest-media-storage-bucket.s3.us")) {
        setCompressedImage(imageProps.src);
        return;
      }
      const img = await compressImage(imageProps.src);
      setCompressedImage(img);
    }
    compress();
  }, [imageProps.src]);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        ref={imageRef}
        {...imageProps}
        image={image}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragMove={(e) => {
          const node = e.target;
          const stage = node.getStage();

          const stageWidth = stage.width();
          const stageHeight = stage.height();

          const imageWidth = node.width() * node.scaleX();
          const imageHeight = node.height() * node.scaleY();

          let newX = node.x();
          let newY = node.y();

          if (newX < 0) newX = 0;
          if (newY < 0) newY = 0;
          if (newX + imageWidth > stageWidth) newX = stageWidth - imageWidth;
          if (newY + imageHeight > stageHeight)
            newY = stageHeight - imageHeight;

          node.x(newX);
          node.y(newY);
        }}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = imageRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />

      {isSelected && (
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

export default CanvasImage;
