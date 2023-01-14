export default function SelectBox({id, handleChange, value, options}){
    return (
      <select id={id}
              name={id}
              onChange={handleChange} value={value} className="form-select">
          {
              options.map( label =>
                  <option key={label} value={label}>{label}</option>
              )
          }
      </select>

    );
}