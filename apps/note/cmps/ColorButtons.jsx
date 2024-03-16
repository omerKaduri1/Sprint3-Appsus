export function ColorButtons({
  note,
  changeBackgroundColor,
  openPaletteNoteId,
  setOpenPaletteNoteId,
}) {
  const colors = [
    "#ffffff",
    "#efeff1",
    "#d3bfdb",
    "#d4e4ed",
    "#aeccdc",
    "#b4ddd3",
    "#e2f6d3",
    "#f39f76",
  ]
  const isPaletteOpen = note.id === openPaletteNoteId
  function togglePalette() {
    setOpenPaletteNoteId((prevId) => (prevId === note.id ? "" : note.id))
  }

  function onColorClick(color) {
    changeBackgroundColor(note, color)
    isPaletteOpen = !isPaletteOpen
    setOpenPaletteNoteId("")
  }

  return (
    <section className="color-btn">
      <button onClick={togglePalette} className="palette-btn">
        <i className="fa-solid fa-palette"></i>
        <section
          className={`color-palette ${isPaletteOpen ? "open" : "closed"}`}
        >
          {colors.map((color, idx) => (
            <div
              className="color"
              key={idx}
              onClick={() => onColorClick(color)}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </section>
      </button>
    </section>
  )
}
