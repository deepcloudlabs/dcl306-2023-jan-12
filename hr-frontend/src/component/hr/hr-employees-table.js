import Table from "../common/table/table";
import TableHeader from "../common/table/table-header";
import TableBody from "../common/table/table-body";
import {useEmployees} from "../../provider/hr-provider";
import Badge from "../common/output/badge";
import Button from "../common/input/button";

const columns = "ID,Identity No,Photo,Full Name,Salary,IBAN,Birth Year,Department,Is full-time?,Operations";
export default function HrEmployeesTable() {
    const employees = useEmployees();

    return (
        <Table id="employees">
            <TableHeader columns={columns}/>
            <TableBody>
                {
                    employees.map((emp, idx) =>
                        <tr key={emp.identityNo}>
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
                            <td>{emp.fulltime ? 'FULL-TIME' : 'PART-TIME'}</td>
                            <td><Button bgColor="bg-danger"
                                        click={()=>{}}
                                        id="fireEmp"
                                        label="Fire Employee"></Button></td>
                        </tr>
                    )
                }
            </TableBody>
        </Table>
    );
}