import { useState } from "react";
import type { List } from "../../../modules/lists/list.entity";

type EditFormValues = {
  title: string;
  description: string;
};

type Props = {
  list: List;
  onClose: () => void;
  onSubmit: (values: EditFormValues) => Promise<void>;
};

export function EditModal({ list, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState(list.title);
  const [description, setDescription] = useState(list.description);

  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>編集</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={() => onSubmit({ title, description })}>保存</button>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}
