
export default function Menu(props) {

  return(
    <div>
      <button onClick={ () => {props.useSettings(props.values[0])} }>Easy</button>
      <button onClick={ () => {props.useSettings(props.values[1])} }>Medium</button>
      <button onClick={ () => {props.useSettings(props.values[2])} }>Hard</button>
    </div>
  );

}