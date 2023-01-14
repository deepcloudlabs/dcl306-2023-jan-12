import Label from "../output/label";

export default function Photo({id, label, handleChange, value, width}) {
    function handleInputFileChange(event) {
        const fileName = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            handleChange(e.target.result);
        }
        fileReader.readAsDataURL(fileName);
    }

    return (
        <div className="input-group">
            <Label label={label} htmlFor={id}/>
            <img className="img-thumbnail"
                 style={{"width": width}}
                 src={value}></img>
            <label>
                <input type="file"
                       onChange={handleInputFileChange}
                       style={{'display': 'none'}}></input>
                <span className="btn btn-primary">File</span>
            </label>
        </div>
    );
}