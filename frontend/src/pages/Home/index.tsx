import { useCallback, useEffect, useState } from "react";
import { listRepository } from "../../modules/lists/list.repository";
import { AddList } from "./AddList";
import { TodoList } from "./TodoList";
import { List } from "../../modules/lists/list.entity";
import { EditModal } from "./EditModal";

export default function Home() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingList, setEditingList] = useState<List | null>(null);

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
      setLists((prev) => [new List(newTodo), ...prev]);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateList = useCallback(
    async (id: number, payload: { title?: string; description?: string }) => {
      try {
        const updated = await listRepository.update(id, payload);
        setLists((prev) =>
          prev.map((item) =>
            String(item.id) === String(id) ? new List(updated) : item
          )
        );
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

  const deleteList = useCallback(async (id: number) => {
    try {
      await listRepository.delete(id);
      setLists((prev) => prev.filter((item) => String(item.id) !== String(id)));
    } catch (e) {
      console.error(e);
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
        onEdit={(list) => setEditingList(list)}
        onDelete={deleteList}
      />

      {editingList && (
        <EditModal
          list={editingList}
          onClose={() => setEditingList(null)}
          onSubmit={async (values) => {
            await updateList(Number(editingList.id), values);
            setEditingList(null);
          }}
        />
      )}
    </div>
  );
}
