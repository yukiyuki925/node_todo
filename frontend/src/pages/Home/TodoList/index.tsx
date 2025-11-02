import type { List } from "../../../modules/lists/list.entity";

type Props = {
  lists: List[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
};

export const TodoList = ({ lists, loading, error, onRefresh }: Props) => {
  if (loading) return <div>読み込み中…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h4>タスク一覧</h4>
      <button onClick={onRefresh}>最新の情報を取得</button>
      <ul>
        {lists.map((l) => (
          <li key={l.id}>
            {l.title}：{l.description}
          </li>
        ))}
      </ul>
    </div>
  );
};
