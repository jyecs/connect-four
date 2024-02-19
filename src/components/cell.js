export default function Cell(props) {
  return(<img onClick={(e) => props.onMove([props.row, props.col])} 
              className="piece" 
              src = {require("../player" + props.value + ".png")} 
              alt = ""/>);
}
