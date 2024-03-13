const { useState, useEffect } = React

export function NoteEdit({ note, saveNote }) {
  const [editedInfo, setEditedInfo] = useState(note.info.txt)

  function onEdit(ev) {
    ev.preventDefault()
    note.info.txt = editedInfo
    saveNote(note)
  }

  function handleChange({ target }) {
    const { value } = target
    setEditedInfo(value)
  }

  return (
    <section className="edit-container">
      <form className="note-edit" onSubmit={onEdit}>
        {/* <input
          className="title-input"
          required
          onChange={handleChange}
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={editedInfo.title}
        /> */}

        <input
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
