import FormGroup from "../common/output/form-group";
import InputText from "../common/input/input-text";
import Label from "../common/output/label";
import SelectBox from "../common/input/select-box";
import CheckBox from "../common/input/check-box";
import Photo from "../common/input/photo";
import {useDepartments, useEmployees, useHr, useHrDispatcher} from "../../provider/hr-provider";
import Button from "../common/input/button";

export function HrForm() {
    const hr = useHr();
    const employee = hr.employee;
    const hrDispatcher = useHrDispatcher();
    const departments = useDepartments();

    //region HIRE EMPLOYEE
    function hireEmploye(event) {
        fetch("http://localhost:4001/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, body: JSON.stringify(employee)
        })
            .then(res => res.json())
            .then(response => hrDispatcher({type: "HIRE_EMPLOYEE", response}))
    }
    //endregion

    //region FIND EMPLOYEE BY IDENTITY NO
    function findEmployeeByIdentityNo(event) {
        fetch(`http://localhost:4001/employees/${employee.identityNo}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(employee => hrDispatcher({type: "FIND_EMPLOYEE", employee}))
    }
    //endregion

    //region UPDATE EMPLOYEE
    function updateEmployee(event){
        fetch("http://localhost:4001/employees", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, body: JSON.stringify(employee)
        })
            .then(res => res.json())
            .then(response => hrDispatcher({type: "UPDATE_EMPLOYEE", response}))
    }
    //endregion

    return (
        <>
            <FormGroup className="form-floating">
                <InputText value={hr.employee.identityNo}
                           id="identityNo"
                           handleChange={(event) => hrDispatcher({type: "HANDLE_INPUT_CHANGE", event})}/>
                <Label label="Identity No" htmlFor="identityNo"/>
                <Button id="findEmployee"
                        label="Find Employee"
                        click={findEmployeeByIdentityNo}
                        bgColor="bg-success"></Button>
                <Button id="fireEmployee"
                        label="Fire Employee"
                        click={(event) => hrDispatcher({type: "FIRE_EMPLOYEE"})}
                        bgColor="bg-danger"></Button>
            </FormGroup>
            <FormGroup className="form-floating">
                <InputText value={hr.employee.fullname}
                           id="fullname"
                           handleChange={(event) => hrDispatcher({type: "HANDLE_INPUT_CHANGE", event})}/>
                <Label label="Full Name" htmlFor="fullname"/>
            </FormGroup>
            <FormGroup className="form-floating">
                <InputText value={hr.employee.salary}
                           id="salary"
                           handleChange={(event) => hrDispatcher({type: "HANDLE_INPUT_CHANGE", event})}/>
                <Label label="Salary" htmlFor="salary"/>
            </FormGroup>
            <FormGroup className="form-floating">
                <InputText value={hr.employee.iban}
                           id="iban"
                           handleChange={(event) => hrDispatcher({type: "HANDLE_INPUT_CHANGE", event})}/>
                <Label label="International Bank Account Number" htmlFor="iban"/>
            </FormGroup>
            <FormGroup className="form-floating">
                <InputText value={hr.employee.birthYear}
                           id="birthYear"
                           handleChange={(event) => hrDispatcher({type: "HANDLE_INPUT_CHANGE", event})}/>
                <Label label="Birth Year" htmlFor="birthYear"/>
            </FormGroup>
            <FormGroup className="form-floating">
                <SelectBox value={hr.employee.department}
                           options={departments}
                           id="department"
                           handleChange={(event) => hrDispatcher({type: "HANDLE_INPUT_CHANGE", event})}/>
                <Label label="Department" htmlFor="department"/>
            </FormGroup>
            <FormGroup className="form-floating">
                <CheckBox value={hr.employee.fulltime}
                          label="FULL-TIME"
                          id="fulltime"
                          handleChange={(event) => hrDispatcher({type: "HANDLE_CHECKBOX_CHANGE", event})}/>
            </FormGroup>
            <FormGroup className="form-floating">
                <Photo value={hr.employee.photo}
                       label="Photo"
                       id="photo"
                       handleChange={(image) => hrDispatcher({type: "HANDLE_PHOTO_CHANGE", image})}/>
            </FormGroup>
            <FormGroup>
                <Button id="hireEmployee"
                        label="Hire Employee"
                        click={hireEmploye}
                        bgColor="bg-primary"></Button>
                <Button id="updateEmployee"
                        label="Update Employee"
                        click={updateEmployee}
                        bgColor="bg-warning"></Button>
            </FormGroup>
        </>
    );
}