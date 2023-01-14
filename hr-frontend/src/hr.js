import Container from "./component/common/container";
import Card from "./component/common/card";
import CardHeader from "./component/common/card-header";
import CardBody from "./component/common/card-body";
import FormGroup from "./component/common/form-group";
import InputText from "./component/common/input-text";
import Label from "./component/common/label";
import {useDepartments, useHr, useHrDispatcher} from "./provider/hr-provider";
import SelectBox from "./component/common/select-box";

function Hr() {
    const hr = useHr();
    const hrDispatcher = useHrDispatcher();
    const departments = useDepartments();

    return (
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Employee Form"/>
                <CardBody>
                    <FormGroup className="form-floating">
                        <InputText value={hr.employee.identityNo}
                                   id="identityNo"
                                   handleChange={(event) => hrDispatcher({type: "HANDLE_INPUT_CHANGE", event})}/>
                        <Label label="Identity No" htmlFor="identityNo"/>
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
                </CardBody>
            </Card>
        </Container>
    );
}

export default Hr;
