import { useState } from "react";

type Props = {
  onCreate: (title: string, description: string) => void;
};

export const AddList = ({ onCreate }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onCreate(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <div>
        <p>タイトル</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>内容</p>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>作成</button>
      </div>
    </div>
  );
};
