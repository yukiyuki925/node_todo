import type { List } from "../../../modules/lists/list.entity";

type Props = {
  lists: List[];
  loading: boolean;
  error: string | null;
  onEdit: (list: List) => void;
  onDelete: (id: number) => void;
};

export const TodoList = ({
  lists,
  loading,
  error,
  onEdit,
  onDelete,
}: Props) => {
  if (loading) return <div>読み込み中…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h4>タスク一覧</h4>
      <ul>
        {lists.map((l) => (
          <li key={l.id}>
            {l.title}：{l.description}
            <button onClick={() => onEdit(l)}>編集</button>
            <button onClick={() => onDelete(Number(l.id))}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
