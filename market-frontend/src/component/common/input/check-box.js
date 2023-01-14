export default function CheckBox({id, label, handleChange, value}) {
    return (
        <div className="form-check">
            <label className="form-check-label">
                {label}
                <input type="checkbox"
                       id={id}
                       name={id}
                       onChange={handleChange}
                       checked={value}
                       className="form-check-input">
                </input>
            </label>
        </div>
    );
}