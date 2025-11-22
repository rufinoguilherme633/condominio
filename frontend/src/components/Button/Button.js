
function Button({text, onClick, button_style}){
    return(
        <>
       <button onClick = {onClick} className={`${button_style}`}>{text}</button >
        </>
    )
}

export default Button