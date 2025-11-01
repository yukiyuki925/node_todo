import { TodoList } from "../TodoList";

function Home() {
  return (
    <div>
      <h4>todo</h4>
      <div>
        <p>タイトル</p>
        <input type="text" />
        <p>内容</p>
        <input type="text" />
      </div>
      <div>
        <button>作成</button>
      </div>
      <TodoList />
    </div>
  );
}
export default Home;
