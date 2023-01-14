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
        case "GET_EMPLOYEES":
            break;
        default:
            throw `Unknown action type (${action.type})`;
    }
    return {employee, employees};
}