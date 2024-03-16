export function TodoAdd({ todo, onChange, onRemove, onAdd }) {
  function handleChange(ev) {
    onChange(ev)
  }

  function handleAddTodo() {
    onAdd()
  }

  function handleRemoveTodo(){
    onRemove()
  }

  return (
    <section className="todo-task flex">
      <button className="add-todo" type="button" onClick={handleAddTodo}>
        <i className="fa-solid fa-plus"></i>{" "}
      </button>
      <button onClick={handleRemoveTodo} type="button">
      <i className="fa-solid fa-trash-can"></i>
      </button>
      <input
        type="text"
        placeholder="Enter todo..."
        name="txt"
        value={todo.txt}
        onChange={handleChange}
      />
    </section>
  )
}
