const { useState, useEffect } = React

export function NoteTxtEdit({ note, saveNote, onSetEdit }) {
  const [editedInfo, setEditedInfo] = useState(note.info.txt)

  function onEdit(ev) {
    ev.preventDefault()
    note.info.txt = editedInfo
    saveNote(note)
    onSetEdit()
  }

  function handleChange({ target }) {
    const { value } = target
    console.log(value)
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
