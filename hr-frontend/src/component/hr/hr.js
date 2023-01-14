import Container from "../common/card/container";
import Card from "../common/card/card";
import CardHeader from "../common/card/card-header";
import CardBody from "../common/card/card-body";
import FormGroup from "../common/output/form-group";
import InputText from "../common/input/input-text";
import Label from "../common/output/label";
import {useDepartments, useHr, useHrDispatcher} from "../../provider/hr-provider";
import SelectBox from "../common/input/select-box";
import CheckBox from "../common/input/check-box";
import Photo from "../common/input/photo";

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
                    <FormGroup className="form-floating">
                        <CheckBox value={hr.employee.fulltime}
                                   label="FULL-TIME"
                                   id="fulltime"
                                   handleChange={(event) => hrDispatcher({type: "HANDLE_INPUT_CHANGE", event})}/>
                    </FormGroup>
                    <FormGroup className="form-floating">
                        <Photo value={hr.employee.photo}
                                   label="Photo"
                                   id="photo"
                                   handleChange={(image) => hrDispatcher({type: "HANDLE_PHOTO_CHANGE", image})}/>
                    </FormGroup>
                </CardBody>
            </Card>
        </Container>
    );
}

export default Hr;
