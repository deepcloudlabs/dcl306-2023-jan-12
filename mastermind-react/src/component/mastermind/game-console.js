import Card from "../common/card";
import CardHeader from "../common/card-header";
import CardBody from "../common/card-body";
import FormGroup from "../common/form-group";
import Label from "../common/label";
import Badge from "../common/badge";
import ProgressBar from "../common/progress-bar";
import InputText from "../common/input-text";
import Button from "../common/button";
import Table from "../common/table/table";
import TableHeader from "../common/table/table-header";
import TableBody from "../common/table/table-body";
import EvaluateMove from "./evaluate-move";
import {useGame, useGameDispatcher} from "../../provider/game-provider";
import {useEffect} from "react";

export default function GameConsole() {
    const game = useGame();
    const gameDispatcher = useGameDispatcher();

    function play(event) {
        gameDispatcher({type: "PLAY"}, event);
    }

    function handleInputChange(event) {
        gameDispatcher({type: "GUESS_CHANGED", event});
    }

    useEffect(() => {
        const timerId = setInterval(() => gameDispatcher({type: "TIMEOUT"}), 1_000);
        return () => {
            clearInterval(timerId);
        }
    });

    return (
        <Card id="gameConsole">
            <CardHeader title="Game Console"/>
            <CardBody>
                <FormGroup>
                    <Label label="Game Level" htmlFor="gameLevel"/>
                    <Badge id="gameLevel" bgColor="bg-success" value={game.level}/>
                </FormGroup>
                <FormGroup>
                    <Label label="Lives" htmlFor="lives"/>
                    <Badge id="lives" bgColor="bg-primary" value={game.lives}/>
                </FormGroup>
                <FormGroup>
                    <Label label="Tries" htmlFor="tries"/>
                    <Badge id="tries" bgColor="bg-warning" value={game.tries}/>
                    <span className="form-label"> out of </span>
                    <Badge id="maxTries" bgColor="bg-danger" value={game.maxTries}/>
                </FormGroup>
                <FormGroup>
                    <Label label="Counter" htmlFor="counter"/>
                    <ProgressBar id="counter"
                                 value={game.counter}
                                 pbColor={game.pbColorCounter}
                                 pbWidth={game.pbWidthCounter}></ProgressBar>
                </FormGroup>
                <FormGroup>
                    <Label label="Guess" htmlFor="guess"/>
                    <InputText id="guess"
                               value={game.guess}
                               handleChange={handleInputChange}/>
                    <p></p>
                    <Button id="play" label="Play" bgColor="btn-success"
                            click={play}/>
                </FormGroup>
                <FormGroup>
                    <Table id="moves">
                        <TableHeader columns="ID,Guess,Message,Evaluation"/>
                        <TableBody>
                            {
                                game.moves.map((move, index) =>
                                    <tr key={move.guess * index}>
                                        <td>{index + 1}</td>
                                        <td>{move.guess}</td>
                                        <td>{move.message}</td>
                                        <td><EvaluateMove move={move}/></td>
                                    </tr>
                                )
                            }
                        </TableBody>
                    </Table>
                </FormGroup>
            </CardBody>
        </Card>
    );
}