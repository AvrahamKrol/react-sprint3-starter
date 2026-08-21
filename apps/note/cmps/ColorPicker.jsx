export function ColorPicker({ isOpen, bgcColors, onChangeColor }) {
  return (
    <div className={`color-container ${!isOpen ? 'hidden' : ''}`}>
      {Object.entries(bgcColors).map(([colorName, colorValue]) => (
        <span
          key={colorName}
          className={`color-item ${colorName}-color`}
          onClick={(ev) => {
            ev.stopPropagation()
            onChangeColor(colorValue)
          }}
        ></span>
      ))}
    </div>
  )
}
