export default function hrReducer(hrState, action) {
    const employee = {...hrState.employee};
    const employees = [...hrState.employees];
    switch (action.type){
        case "HIRE_EMPLOYEE":
            break;
        case "FIRE_EMPLOYEE":
            break;
        case "GET_EMPLOYEE":
            break;
        case "HANDLE_PHOTO_CHANGE":
            employee.photo = action.image;
            break;
        case "HANDLE_INPUT_CHANGE":
            const event = action.event;
            employee[event.target.name] = event.target.value;
            break;
        default:
            throw `Unknown action type (${action.type})`;
    }
    return {employee, employees};
}