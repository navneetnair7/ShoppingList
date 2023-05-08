import { shoppinglist } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { api } from "~/utils/api";

interface ItemModalProps {
  setStatus: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<shoppinglist[]>>;
}

const ItemModal: FC<ItemModalProps> = ({ setStatus, setItems }) => {
  const [input, setInput] = useState<string>("");
  const { mutate: addItem } = api.item.addItem.useMutation({
    onSuccess: (item) => {
      setItems((prev) => [...prev, item]);
      setInput("");
    },
  });
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="w-1/5 space-y-4 border-black bg-white p-3">
        <h3 className="text-xl font-semibold">Name of Item</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border-gray-100 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-300"
        />
        <div className="grid grid-cols-2 gap-8">
          <button
            type="button"
            className="rounded-md bg-gray-500 p-1 text-sm text-white transition hover:bg-gray-700"
            onClick={() => setStatus(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              addItem({ name: input });
              setStatus(false);
            }}
            className="rounded-md bg-violet-500 p-1 text-sm text-white transition hover:bg-violet-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
