import TodoItem from "./TodoItem";

const todos = [
  {
    title: "todo seven",
    id: 1695744822533,
    completed: false,
  },
  {
    title: "todo three",
    id: 1695746023934,
    completed: false,
  },
];

const TodoList = () => {
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
