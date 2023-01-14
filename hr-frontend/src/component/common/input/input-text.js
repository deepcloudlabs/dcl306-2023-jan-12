export default function InputText({id, handleChange, value}){
    return(
        <input id={id}
               className="form-control"
               type="text"
               name={id}
               onChange={handleChange}
               value={value} />
    );
}