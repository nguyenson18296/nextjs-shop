import { useCallback } from "react";

interface IDragDropImageZone {
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const DragDropImageZone: React.FC<IDragDropImageZone> = ({
  handleDragLeave,
  handleDrop,
}) => {
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div
      className="w-full h-[250px] flex items-center justify-center text-[#fff] bg-[#b4c6e1] text-3xl border-dashed border-[#000] border-2 mt-4"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h1>Kéo thả vào đây để tải hình ảnh</h1>
    </div>
  );
};
