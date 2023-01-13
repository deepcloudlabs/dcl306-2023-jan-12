import Card from "../common/card";
import CardHeader from "../common/card-header";
import CardBody from "../common/card-body";
import FormGroup from "../common/form-group";
import Label from "../common/label";
import Badge from "../common/badge";
import {useStatistics} from "../../provider/game-provider";

export default function GameStatistics() {
    const statistics = useStatistics();

    return (
        <Card id="gameStatistics">
            <CardHeader title="Game Statistics"/>
            <CardBody>
                <FormGroup>
                    <Label label="Wins" htmlFor="wins"/>
                    <Badge id="wins" bgColor="bg-success" value={statistics.wins}/>
                </FormGroup>
                <FormGroup>
                    <Label label="Loses" htmlFor="loses"/>
                    <Badge id="loses" bgColor="bg-danger" value={statistics.loses}/>
                </FormGroup>
            </CardBody>
        </Card>
    );
}