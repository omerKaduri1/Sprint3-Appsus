const { useRef, useState, useEffect } = React

export function ColorButtons({ note, changeBackgroundColor }) {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const colors = ["fff", "#B4FF9F", "#F9FFA4", "#FFD59E", "#FFA1A1"]

  function togglePalette() {}

  function onColorClick(color) {
    // onChangeBgColor(color, note)
    // setBgColor(color)
    changeBackgroundColor(note, color)
    // setIsPaletteOpen(false)
  }

  return (
    <section className="color-btn">
      <button onClick={togglePalette}>Color palette</button>

      <section className={`color-palette ${isPaletteOpen ? "open" : "closed"}`}>
        {colors.map((color, idx) => (
          <div
            key={idx}
            onClick={() => onColorClick(color)}
            style={{ backgroundColor: color, width: "50px", height: "50px" }}
          ></div>
        ))}
      </section>
    </section>
  )
}
