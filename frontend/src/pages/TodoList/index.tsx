import { useEffect, useState } from "react";
import { List } from "../../modules/lists/list.entity";
import { listRepository } from "../../modules/lists/list.repository";

export const TodoList = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchLists = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await listRepository.find();
        if (mounted) setLists(data);
      } catch (e) {
        console.error(e);
        if (mounted) setError("データの取得に失敗しました");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchLists();
    return () => {
      mounted = false;
    };
  }, []);
  if (loading) return <div>読み込み中...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h4>タスク一覧</h4>
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
