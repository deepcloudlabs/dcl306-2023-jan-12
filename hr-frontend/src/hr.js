import Container from "./component/common/container";
import Card from "./component/common/card";
import CardHeader from "./component/common/card-header";
import CardBody from "./component/common/card-body";
import FormGroup from "./component/common/form-group";
import InputText from "./component/common/input-text";
import Label from "./component/common/label";
import {useContext} from "react";
import {HrContext} from "./provider/hr-provider";

function Hr() {
    const {hr, hrDispatcher} = useContext(HrContext);

    return (
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Employee Form"/>
                <CardBody>
                    <FormGroup className="form-floating">
                        <InputText value={hr.employee.identityNo}
                                   id="identityNo"
                                   handleChange={(event)=> hrDispatcher({type: "HANDLE_INPUT_CHANGE", event})} />
                        <Label label="Identity No" htmlFor="identityNo"/>
                    </FormGroup>
                </CardBody>
            </Card>
        </Container>
    );
}

export default Hr;
