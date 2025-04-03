import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { getAsyncTodos } from "../../features/todo/todoSlice";
import { useEffect } from "react";

const TodoList = () => {
  const { todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodos());
  }, [dispatch]);

  return (
    <div>
      <h2>TodoList</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="list-group">
          {todos.map((item) => {
            return <TodoItem key={item.id} {...item} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
