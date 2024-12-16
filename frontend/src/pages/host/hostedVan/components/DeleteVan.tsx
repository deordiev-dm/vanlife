import deleteVan from "@/features/vans/api/deleteVan";
import { Van } from "@/lib/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DELETE_DELAY_MS = 1500;

function DeleteVan({ van }: { van: Van }) {
  const [nameInput, setNameInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteVan(van._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vans"] });
      navigate("..");
    },
  });

  function handleDeletion() {
    setIsDeleting(true);
    timerRef.current = setTimeout(() => {
      mutation.mutate();
      setIsDeleting(false);
    }, DELETE_DELAY_MS);
  }

  function handleCancelation() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      setIsDeleting(false);
      setNameInput("");
    }
  }

  return (
    <div className="delete-van-container rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 text-3xl font-semibold">Delete Van</h2>
      <p className="mb-3 text-lg text-red-600">
        Are you sure you want to delete the van? This action cannot be undone.
      </p>

      <div className="mb-4 grid justify-start gap-1">
        <p>
          If you`re sure you want to delete it, type{" "}
          <span className="rounded bg-red-100 p-1 font-mono">{van.name}</span>{" "}
          in the field below in order to proceed.
        </p>
        <input
          className="rounded border px-3 py-2"
          id="confirim-van-deletion"
          type="text"
          placeholder={van.name}
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
      </div>
      <div className="space-x-4">
        <button
          disabled={nameInput !== van.name || isDeleting}
          className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:bg-gray-200"
          onClick={handleDeletion}
        >
          Delete
        </button>
        {isDeleting && (
          <button
            className="relative overflow-clip rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            onClick={handleCancelation}
          >
            Cancel
            <span
              className="timer absolute bottom-0 left-0 h-0.5 w-full rounded-md bg-red-600"
              style={{
                animationDuration: DELETE_DELAY_MS + "ms",
              }}
            ></span>
          </button>
        )}
      </div>
    </div>
  );
}

export default DeleteVan;
