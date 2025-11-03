import { useState } from "react";
import type { List } from "../../../modules/lists/list.entity";
import "./EditModal.css";

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

  const handleSubmit = () => {
    onSubmit({ title, description });
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-header">
          <h3>編集</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <input
          className="modal-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
        />

        <textarea
          className="modal-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="詳細"
        />

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            キャンセル
          </button>
          <button className="btn primary" onClick={handleSubmit}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
