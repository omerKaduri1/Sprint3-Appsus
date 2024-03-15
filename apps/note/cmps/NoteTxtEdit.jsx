const { useState } = React

export function NoteTxtEdit({ note, saveNote, onSetEdit }) {
  const [editedInfo, setEditedInfo] = useState(note.info.txt)

  function onEdit(ev) {
    ev.preventDefault()
    const updatedNote = {
      ...note,
      info: {
        ...note.info,
        txt: editedInfo,
      },
    }
    // note.info.txt = editedInfo
    saveNote(updatedNote)
    onSetEdit()
  }

  function handleChange({ target }) {
    const { value } = target
    setEditedInfo(value)
  }

  return (
    <section className="edit-container">
      <form className="note-edit flex column align-center" onSubmit={onEdit}>
        <input
          className="txt-input"
          onChange={handleChange}
          name="txt"
          id="txt"
          value={editedInfo}
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
