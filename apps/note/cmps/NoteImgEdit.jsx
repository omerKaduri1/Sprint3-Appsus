const { useState } = React

export function NoteImgEdit({ note, saveNote, onSetEdit }) {
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
    <section className="edit-container note-img-edit">
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
          className="imgUrl txt-input"
          placeholder="Edit image url..."
          name="imgUrl"
          id="imgUrl"
          value={editedInfo.imgUrl}
        />
        <div className="actions-container">
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  )
}
