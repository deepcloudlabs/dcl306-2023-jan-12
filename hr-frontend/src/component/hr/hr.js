import Container from "../common/card/container";
import Card from "../common/card/card";
import CardHeader from "../common/card/card-header";
import CardBody from "../common/card/card-body";
import {HrForm} from "./hr-form";
import HrEmployeesTable from "./hr-employees-table";

function Hr() {

    return (
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Employee Form"/>
                <CardBody>
                    <HrForm />
                </CardBody>
            </Card>
            <p></p>
            <Card>
                <CardHeader title="Employees"/>
                <CardBody>
                    <HrEmployeesTable />
                </CardBody>
            </Card>
        </Container>
    );
}

export default Hr;
