export default function Card({id,children}){
    return (
        <div id={id} className="card">
            {children}
        </div>
    );
}