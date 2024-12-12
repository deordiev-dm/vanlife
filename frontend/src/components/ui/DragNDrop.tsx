import { CSSProperties, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle: CSSProperties = {
  borderWidth: "2px",
  borderStyle: "solid",
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

const errorStyle: CSSProperties = {
  borderColor: "#ef4444",
  color: "#ef4444",
};

type DragNDropProps = {
  inputError?: boolean;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function DragNDrop({ inputError, setImage }: DragNDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith("image/")) {
        setIsDragging(false);
        setImage(file);
        setImagePreview(URL.createObjectURL(acceptedFiles[0]));
      }
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
      ...(inputError && !imagePreview && errorStyle),
      ...(isFocused && focusedStyle),
      ...(isDragging && draggingStyle),
      ...(isDragAccept && acceptedStyle),
      ...(isDragReject && rejectStyle),
    }),
    [
      isFocused,
      isDragAccept,
      isDragReject,
      isDragging,
      imagePreview,
      inputError,
    ],
  );

  return (
    <div {...getRootProps({ style })}>
      <input
        {...getInputProps({
          id: "image-upload",
        })}
      />
      <div className="flex flex-col items-center">
        {!isDragActive && (
          <p>Drag 'n' drop the van image here, or click to select one</p>
        )}
        {isDragAccept && <p>Drop the van image right here...</p>}
        {isDragReject && <p>Only images are allowed</p>}
        {imagePreview && (
          <div className="mt-2 flex items-center gap-x-2">
            <p className="text-sm text-gray-500">Selected file: {}</p>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="max-w-16 rounded-lg border border-gray-300"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
