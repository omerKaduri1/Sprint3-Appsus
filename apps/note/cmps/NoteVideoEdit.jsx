const { useState } = React

export function NoteVideoEdit({ note, saveNote, onSetEdit }) {
  const [editedInfo, setEditedInfo] = useState(note.info)

  function onEdit(ev) {
    ev.preventDefault()
    const updatedNote = { ...note, info: { ...editedInfo } }
    saveNote(updatedNote)
    onSetEdit()
  }

  function handleChange({ target }) {
    const { value, name: field } = target
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }))
  }

  return (
    <section className="edit-container note-video-edit">
      <form className="note-edit flex column align-center" onSubmit={onEdit}>
        <input
          className="title txt-input"
          onChange={handleChange}
          name="title"
          id="title"
          value={editedInfo.title}
          cols="30"
          rows="10"
          placeholder="Edit title..."
        />

        <input
          onChange={handleChange}
          type="text"
          className="youtubeUrl txt-input"
          placeholder="Edit youtube url..."
          name="youtubeUrl"
          id="youtubeUrl"
          value={editedInfo.youtubeUrl}
        />
        <div className="actions-container">
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  )
}
