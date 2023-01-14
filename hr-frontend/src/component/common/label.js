export default function Label({label, htmlFor}){
    return (
        <label className="form-label" htmlFor={htmlFor}>{label}: </label>
    );
}