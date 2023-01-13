import React from "react";
import Label from "./component/common/label";
import Badge from "./component/common/badge";
import Container from "./component/common/container";
import Card from "./component/common/card";
import CardHeader from "./component/common/card-header";
import CardBody from "./component/common/card-body";
import FormGroup from "./component/common/form-group";
import ProgressBar from "./component/common/progress-bar";
import InputText from "./component/common/input-text";
import Button from "./component/common/button";
import {evaluateMove, initialGameState, initializeGame} from "./utility/mastermind";
import Table from "./component/common/table/table";
import TableHeader from "./component/common/table/table-header";
import TableBody from "./component/common/table/table-body";
import EvaluateMove from "./component/mastermind/evaluate-move";
import loadStateFromLocalStorage from "./utility/localstorage-util";

//region NOTES ON COMPONENTS
// 1. Component-Based Programming
//    a. stateful components
//       1) class-based component ✔
//       2) function-based component + React Hooks ✔
//    b. stateless components
//       3) function-based component ✔
//    Context API, reducer ✘
//    React Routing ✘
// 2. Functional Programming
// 3. Reactive Programming
//endregion
// stateful component
class Mastermind extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = loadStateFromLocalStorage("mastermind", initialGameState);
        // this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.timerId = setInterval(this.countDown, 1_000);
    }


    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    decrementCounter = (game) => {
        game.counter--;
        game.pbWidthCounter = Math.round(game.counter * 5 / 3).toString().concat("%");
        if (game.counter <= 30)
            game.pbColorCounter = "bg-danger";
        else if (game.counter <= 45)
            game.pbColorCounter = "bg-warning";
        else
            game.pbColorCounter = "bg-primary";
    }
    countDown = () => {
        const game = {...this.state.game};
        this.decrementCounter(game);
        if (game.counter <= 0) {
            if (game.lives === 0) {
                //TODO: player loses the game
            } else {
                game.lives--;
                initializeGame(game);
            }
        }
        this.setState({game},this.saveStateToLocalStorage );
    };
    handleInputChange = (event) => {
        const game = {...this.state.game};
        game[event.target.name] = Number(event.target.value);
        this.setState({game});
    }
    play = (event) => {
        const game = {...this.state.game};
        game.tries++;
        if (game.guess === game.secret) {
            game.level++;
            if (game.level > 10) {
                //TODO: player wins the game
            } else {
                initializeGame(game);
                game.lives++;
            }
        } else if (game.tries > game.maxTries) {
            if (game.lives === 0) {
                //TODO: player loses the game
            } else {
                game.lives--;
                initializeGame(game);
            }
        } else { // player has more tries
            game.moves.push(evaluateMove(game.guess, game.secret));
        }
        this.setState({game}, this.saveStateToLocalStorage);
    }
    saveStateToLocalStorage = () => {
        localStorage.setItem("mastermind", JSON.stringify(this.state));
    };

    render() {
        return (
            <Container id="mastermind">
                <Card id="gameConsole">
                    <CardHeader title="Game Console"/>
                    <CardBody>
                        <FormGroup>
                            <Label label="Game Level" htmlFor="gameLevel"/>
                            <Badge id="gameLevel" bgColor="bg-success" value={this.state.game.level}/>
                        </FormGroup>
                        <FormGroup>
                            <Label label="Lives" htmlFor="lives"/>
                            <Badge id="lives" bgColor="bg-primary" value={this.state.game.lives}/>
                        </FormGroup>
                        <FormGroup>
                            <Label label="Tries" htmlFor="tries"/>
                            <Badge id="tries" bgColor="bg-warning" value={this.state.game.tries}/>
                            <span className="form-label"> out of </span>
                            <Badge id="maxTries" bgColor="bg-danger" value={this.state.game.maxTries}/>
                        </FormGroup>
                        <FormGroup>
                            <Label label="Counter" htmlFor="counter"/>
                            <ProgressBar id="counter"
                                         value={this.state.game.counter}
                                         pbColor={this.state.game.pbColorCounter}
                                         pbWidth={this.state.game.pbWidthCounter}></ProgressBar>
                        </FormGroup>
                        <FormGroup>
                            <Label label="Guess" htmlFor="guess"/>
                            <InputText id="guess"
                                       value={this.state.game.guess}
                                       handleChange={this.handleInputChange}/>
                            <p></p>
                            <Button id="play" label="Play" bgColor="btn-success" click={this.play}/>
                        </FormGroup>
                        <FormGroup>
                            <Table id="moves">
                                <TableHeader columns="ID,Guess,Message,Evaluation"/>
                                <TableBody>
                                    {
                                        this.state.game.moves.map((move, index) =>
                                            <tr key={move.guess}>
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
            </Container>
        );
    }
}

export default Mastermind;
