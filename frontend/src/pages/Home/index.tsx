import { useCallback, useEffect, useState } from "react";
import { listRepository } from "../../modules/lists/list.repository";
import { AddList } from "./AddList";
import { TodoList } from "./TodoList";
import { List } from "../../modules/lists/list.entity";

export default function Home() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLists = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listRepository.find();
      setLists(data);
    } catch (e) {
      console.error(e);
      setError("取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const createList = useCallback(async (title: string, description: string) => {
    try {
      const newTodo = await listRepository.create(title, description);
      // newTodo がプレーンなオブジェクトの場合は List コンストラクタでラップ
      setLists((prev) => [new List(newTodo), ...prev]);
    } catch (e) {
      console.error(e);
      // 必要ならユーザー通知を追加
    }
  }, []);

  return (
    <div>
      <h4>todo</h4>
      <AddList onCreate={createList} />
      <TodoList
        lists={lists}
        loading={loading}
        error={error}
        onRefresh={fetchLists}
      />
    </div>
  );
}
