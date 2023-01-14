import Container from "./component/common/card/container";
import Card from "./component/common/card/card";
import CardHeader from "./component/common/card/card-header";
import CardBody from "./component/common/card/card-body";
import FormGroup from "./component/common/output/form-group";
import SelectBox from "./component/common/input/select-box";
import {useState} from "react";
import Label from "./component/common/output/label";
import Button from "./component/common/input/button";

function Market() {
    const [windowSize, setWindowSize] = useState(25);
    const [monitoringButtonState, setMonitoringButtonState] = useState({status: false, bgColor: "bg-success", label: "Start"});

    function changeMonitoring(event) {
        const newMonitoringButtonState = {...monitoringButtonState};

        if (newMonitoringButtonState.status) {
            newMonitoringButtonState.label = "Start";
            newMonitoringButtonState.bgColor = "bg-success";
        } else {
            newMonitoringButtonState.label = "Stop";
            newMonitoringButtonState.bgColor = "bg-danger";
        }
        newMonitoringButtonState.status = !monitoringButtonState.status;
        setMonitoringButtonState(newMonitoringButtonState);
    }

    return (
        <Container>
            <Card>
                <CardHeader title="Market Data"/>
                <CardBody>
                    <FormGroup className="form-floating">
                        <SelectBox id="windowSize"
                                   value={windowSize}
                                   options={[25, 50, 100, 250]}
                                   handleChange={event => setWindowSize(event.target.value)}/>
                        <Label label="Wind Size" htmlFor="windSize"></Label>
                    </FormGroup>
                    <FormGroup>
                        <Button id="stopMonitor"
                                label={monitoringButtonState.label}
                                click={changeMonitoring}
                                bgColor={monitoringButtonState.bgColor}></Button>
                    </FormGroup>
                </CardBody>
            </Card>
        </Container>
    );
}

export default Market;
