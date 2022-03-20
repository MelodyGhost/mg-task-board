interface IDragPlace {
  handleDragEnter: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (ev: React.DragEvent) => void;
  // position: number;
}
const DragPlace: React.FC<IDragPlace> = ({
  handleDragEnter,
  handleDragLeave,
}) => {
  return (
    <div
      className="opacity-0 h-2 transition-all"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      .
    </div>
  );
};

export default DragPlace;
