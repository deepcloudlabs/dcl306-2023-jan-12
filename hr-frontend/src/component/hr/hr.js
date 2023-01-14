import Container from "../common/card/container";
import Card from "../common/card/card";
import CardHeader from "../common/card/card-header";
import CardBody from "../common/card/card-body";
import {HrForm} from "./hr-form";

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
        </Container>
    );
}

export default Hr;
