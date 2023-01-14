import Table from "../common/table/table";
import TableHeader from "../common/table/table-header";
import TableBody from "../common/table/table-body";
import {useEmployees, useHrDispatcher} from "../../provider/hr-provider";
import Badge from "../common/output/badge";
import Button from "../common/input/button";
import JobStyle from "./job-style";

const columns = "ID,Identity No,Photo,Full Name,Salary,IBAN,Birth Year,Department,Is full-time?,Operations";
export default function HrEmployeesTable() {
    const employees = useEmployees();
    const hrDispatcher = useHrDispatcher();

    function findAllEmployees(event) {
        fetch("http://localhost:4001/employees", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(employees => hrDispatcher({type: "FIND_ALL_EMPLOYEES", employees}))
    }

    function fireEmployee(identityNo){
        fetch(`http://localhost:4001/employees/${identityNo}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(employee => hrDispatcher({type: "FIRE_EMPLOYEE", employee}))
    }

    function copyEmployee(employee){
        hrDispatcher({type: "COPY_EMPLOYEE", employee})
    }
    return (
        <>
            <Button bgColor="bg-info"
                    click={findAllEmployees}
                    id="findAllEmps"
                    label="Find All Employees"></Button>
            <Table id="employees">
                <TableHeader columns={columns}>
                </TableHeader>
                <TableBody>
                    {
                        employees.map((emp, idx) =>
                            <tr onClick={event => copyEmployee(emp)}
                                key={emp.identityNo}>
                                <td>{idx + 1}</td>
                                <td>{emp.identityNo}</td>
                                <td><img src={emp.photo}
                                         style={{width: "32px"}}
                                         className="img-thumbnail"></img>
                                </td>
                                <td>{emp.fullname}</td>
                                <td>{emp.salary}</td>
                                <td>{emp.iban}</td>
                                <td>{emp.birthYear}</td>
                                <td><Badge id="department"
                                           bgColor="bg-info"
                                           value={emp.department}/></td>
                                <td><JobStyle id={emp.identityNo.toString().concat("-fulltime")}
                                              fulltime={emp.fulltime} /></td>
                                <td><Button bgColor="bg-danger"
                                            click={event => fireEmployee(emp.identityNo)}
                                            id="fireEmp"
                                            label="Fire Employee"></Button></td>
                            </tr>
                        )
                    }
                </TableBody>
            </Table>
        </>
    );
}