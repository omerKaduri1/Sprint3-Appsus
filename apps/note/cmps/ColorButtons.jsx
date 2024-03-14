const { useState } = React

export function ColorButtons({ note, changeBackgroundColor }) {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const colors = ["ffffff", "#efeff1", "#d3bfdb", "#d4e4ed", "#aeccdc", '#b4ddd3', '#e2f6d3', '#f39f76']

  function togglePalette() {
    setIsPaletteOpen((prevIsOpen) => !prevIsOpen)
  }

  function onColorClick(color) {
    changeBackgroundColor(note, color)
    setIsPaletteOpen(false)
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
              style={{ backgroundColor: color}}
            ></div>
          ))}
        </section>
      </button>
    </section>
  )
}
