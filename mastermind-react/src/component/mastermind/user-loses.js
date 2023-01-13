import Container from "../common/container";
import Card from "../common/card";
import CardHeader from "../common/card-header";
import CardBody from "../common/card-body";
import {Link} from "react-router-dom";

export default function UserLoses() {
    return (
        <Container>
            <Card id="wins">
                <CardHeader title="Player loses!"/>
                <CardBody>
                    <Link to="/">Would you like to play again?</Link>
                </CardBody>
            </Card>
        </Container>
    )
}