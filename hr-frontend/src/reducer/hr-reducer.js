export default function hrReducer(hrState, action) {
    let employee = {...hrState.employee};
    let employees = [...hrState.employees];
    switch (action.type) {
        case "HIRE_EMPLOYEE":
            if (action.response.status === "OK") {
                //TODO: Hiring an employee is successful
                alert("Successful");
            } else {
                //TODO: Handle error
                alert("Something is wrong");
            }
            break;
        case "FIRE_EMPLOYEE":
            employee = action.employee;
            employees = employees.filter( emp => emp.identityNo !== employee.identityNo);
            break;
        case "COPY_EMPLOYEE":
            employee = action.employee;
            break;
        case "UPDATE_EMPLOYEE":
            if (action.response.nModified > 0) {
                //TODO: Updating an employee is successful
                alert("Successful");
            } else {
                //TODO: Handle error
                alert("Something is wrong");
            }
            break;
        case "FIND_ALL_EMPLOYEES":
            employees = action.employees;
            break;
        case "FIND_EMPLOYEE":
            employee = action.employee;
            break;
        case "HANDLE_PHOTO_CHANGE":
            employee.photo = action.image;
            break;
        case "HANDLE_INPUT_CHANGE":
            const event = action.event;
            employee[event.target.name] = event.target.value;
            break;
        case "HANDLE_CHECKBOX_CHANGE":
            const checkboxEvent = action.event;
            employee[checkboxEvent.target.name] = !employee[checkboxEvent.target.name];
            break;
        default:
            throw `Unknown action type (${action.type})`;
    }
    return {employee, employees};
}