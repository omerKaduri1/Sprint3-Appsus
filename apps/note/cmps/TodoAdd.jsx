export function TodoAdd({ todo, onChange, onRemove, onAdd }) {

  function handleChange(ev) {
    onChange(ev)
    // onAdd()
  }

  return (
    <section className="todo-task">
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
