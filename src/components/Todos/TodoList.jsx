import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  return (
    <div>
      <h2>TodoList</h2>
      <ul className="list-group">
        {todos.map((item) => {
          return <TodoItem key={item.id} {...item} />;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
