export default function Badge({id, bgColor, value}){
    return (
        <span id={id} className={"badge ".concat(bgColor)}>{value}</span>
    );
}