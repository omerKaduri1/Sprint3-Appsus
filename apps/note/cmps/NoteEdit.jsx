const { useState, useEffect } = React

export function NoteEdit({ note, saveNote }) {
  const [editedInfo, setEditedInfo] = useState({
    title: note.info.title,
    txt: note.info.txt,
  })

  function onEdit(ev) {
    ev.preventDefault()
    note.info = { ...note.info, ...editedInfo }
    saveNote(note)
  }

  function handleChange({ target }) {
    const { name: field, value } = target
    setEditedInfo({ ...editedInfo, [field]: value })
  }

  return (
    <section className="edit-container">
      <form className="note-edit" onSubmit={onEdit}>
        <input
          className="title-input"
          required
          onChange={handleChange}
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={editedInfo.title}
        />

        <textarea
          className="txt-input"
          onChange={handleChange}
          name="txt"
          id="txt"
          value={editedInfo.txt}
          cols="30"
          rows="10"
          placeholder="Enter your note..."
        />
        <div className="actions-container">
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  )
}
