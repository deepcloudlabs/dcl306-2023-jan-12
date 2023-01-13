import Container from "./component/common/container";
import Card from "./component/common/card";
import CardHeader from "./component/common/card-header";
import CardBody from "./component/common/card-body";
import FormGroup from "./component/common/form-group";
import Label from "./component/common/label";
import Badge from "./component/common/badge";
import ProgressBar from "./component/common/progress-bar";
import InputText from "./component/common/input-text";
import Button from "./component/common/button";
import Table from "./component/common/table/table";
import TableHeader from "./component/common/table/table-header";
import TableBody from "./component/common/table/table-body";
import EvaluateMove from "./component/mastermind/evaluate-move";
import React, {useEffect, useState} from "react";
import {evaluateMove, initialGameState, initializeGame, initialStatisticsState} from "./utility/mastermind";
import {useNavigate} from "react-router";
import loadStateFromLocalStorage from "./utility/localstorage-util";

function decrementCounter(game) {
    game.counter--;
    game.pbWidthCounter = Math.round(game.counter * 5 / 3).toString().concat("%");
    if (game.counter <= 30)
        game.pbColorCounter = "bg-danger";
    else if (game.counter <= 45)
        game.pbColorCounter = "bg-warning";
    else
        game.pbColorCounter = "bg-primary";
}

export default function MastermindHook() {
    const [game, setGame] = useState(initialGameState);
    const [statistics, setStatistics] = useState(initialStatisticsState);
    const navigate = useNavigate();

    useEffect(() => {
        const timerId = setInterval(countDown, 1_000);
        return () => {
            clearInterval(timerId);
        }
    });

    useEffect(()=>{
       const localStorageState = loadStateFromLocalStorage("mastermind-hooks",initialGameState);
       setGame(localStorageState.game);
       setStatistics(localStorageState.statistics);
       return ()=>{
            localStorage.setItem("mastermind-hooks", JSON.stringify({game,statistics}));
        }
    },[]);

    function countDown() {
        const newGame = {...game};
        decrementCounter(newGame);
        if (newGame.counter <= 0) {
            if (newGame.lives === 0) {
                navigate("/loses");
            } else {
                newGame.lives--;
                initializeGame(newGame);
            }
        }
        setGame(newGame);
        localStorage.setItem("mastermind-hooks", JSON.stringify({game,statistics}));
    }

    function handleInputChange(event) {
        console.log("handleInputChange(event)")
        const newGame = {...game};
        newGame[event.target.name] = Number(event.target.value);
        setGame(newGame);
    }

    function play(event, index) {
        const newGame = {...game};
        const newStatistics = {...statistics};
        newGame.tries++;
        if (newGame.guess === newGame.secret) {
            newGame.level++;
            newStatistics.wins++;
            setStatistics(newStatistics);
            if (newGame.level > 10) {
                navigate("/wins");
            } else {
                initializeGame(newGame);
                newGame.lives++;
            }
        } else if (newGame.tries > newGame.maxTries) {
            newGame.lives--;
            newStatistics.loses++;
            setStatistics(newStatistics);
            if (newGame.lives === 0) {
                navigate("/loses");
            } else {
                initializeGame(newGame);
            }
        } else { // player has more tries
            newGame.moves.push(evaluateMove(newGame.guess, newGame.secret));
        }
        setGame(newGame);
        localStorage.setItem("mastermind-hooks", JSON.stringify({game,statistics}));
    }

    return (
        <Container id="mastermind">
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
                        <Button id="play" label="Play" bgColor="btn-success" click={(event) => play(event, 42)}/>
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
            <p></p>
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
        </Container>
    );
}