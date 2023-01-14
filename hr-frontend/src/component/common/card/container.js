export default function Container({id, children}){
    return (
        <div id={id} className="container">
            <p></p>
            {children}
            <p></p>
        </div>
    );
}