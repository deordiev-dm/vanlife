import { CSSProperties, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle: CSSProperties = {
  borderWidth: "2px",
  borderStyle: "dashed",
  borderColor: "#fb923c",
  color: "#fb923c",
  width: "100%",
  borderRadius: "0.5rem",
  padding: "1rem",
  minHeight: "5rem",
  fontWeight: 700,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
  transition: "all ease-in-out 300ms",
};

const focusedStyle: CSSProperties = {
  borderColor: "#f59e0b",
};

const acceptedStyle: CSSProperties = {
  borderColor: "#10b981",
  color: "#10b981",
  backgroundColor: "#f0fff4",
  animation: "none",
};

const rejectStyle: CSSProperties = {
  borderColor: "#ef4444",
  color: "#ef4444",
  backgroundColor: "#fef2f2",
  animation: "none",
};

const draggingStyle: CSSProperties = {
  borderColor: "#ea6200",
  color: "#ea6200",
  backgroundColor: "#f4e2cf",
  minHeight: "10rem",
};

type DragNDropProps = {
  setImage: (files: File[]) => void;
};

export default function DragNDrop({ setImage }: DragNDropProps) {
  const [isDragging, setIsDragging] = useState(false);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setIsDragging(false);
      setImage(acceptedFiles);
    },
    accept: { "image/*": [] },
    multiple: false,
  });

  useEffect(() => {
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDragLeave);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDragLeave);
    };
  }, []);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused && focusedStyle),
      ...(isDragging && draggingStyle),
      ...(isDragAccept && acceptedStyle),
      ...(isDragReject && rejectStyle),
    }),
    [isFocused, isDragAccept, isDragReject, isDragging],
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {!isDragActive && (
        <p>Drag 'n' drop the van image here, or click to select one</p>
      )}
      {isDragAccept && <p>Drop the van image right here...</p>}
      {isDragReject && <p>Only images are allowed</p>}
    </div>
  );
}
