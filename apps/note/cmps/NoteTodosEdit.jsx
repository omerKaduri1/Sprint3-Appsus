const { useState } = React

export function NoteTodosEdit({ note, saveNote, onSetEdit }) {
  const [editedTitle, setEditedTitle] = useState(note.info.title)
  const [editedTodos, setEditedTodos] = useState(note.info.todos)

  function onEdit(ev) {
    ev.preventDefault()
    const updatedNote = {
      ...note,
      info: { title: editedTitle, todos: [...editedTodos] },
    }
    saveNote(updatedNote)
    onSetEdit()
  }

  function handleTitleChange({ target }) {
    const { value } = target
    setEditedTitle(value)
  }

  function handleChange(idx, { target }) {
    let { name: field, value, checked } = target
    if (field === "doneAt") {
      value = checked ? Date.now() : null
    }
    const updatedTodos = [...editedTodos]
    updatedTodos[idx] = { ...updatedTodos[idx], [field]: value }
    setEditedTodos(updatedTodos)
  }

  function removeTodo(idx) {
    const updatedTodos = [...editedTodos]
    updatedTodos.splice(idx, 1)
    setEditedTodos(updatedTodos)
  }

  return (
    <section className="edit-container todos-edit">
      <form onSubmit={onEdit} className="flex column align-center">
        <input
          className="title txt-input"
          onChange={handleTitleChange}
          name="title"
          id="title"
          value={editedTitle}
          cols="30"
          rows="10"
          placeholder="Edit title..."
          title="edit-title"
        />

        {editedTodos.map((todo, idx) => (
          <section className="todo-container flex align-center" key={idx}>
            <input
              className={todo.doneAt ? "done txt-input" : "txt-input"}
              type="text"
              name="txt"
              id="txt"
              value={todo.txt}
              onChange={(ev) => handleChange(idx, ev)}
            />

            <input
              type="checkbox"
              name="doneAt"
              checked={todo.doneAt ? true : false}
              onChange={(ev) => handleChange(idx, ev)}
            />

            <button type="button" onClick={() => removeTodo(idx)}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </section>
        ))}
        <button type="submit">Save</button>
      </form>
    </section>
  )
}
