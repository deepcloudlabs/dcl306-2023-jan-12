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
import createSecret from "./utility/mastermind";

//region NOTES ON COMPONENTS
// 1. Component-Based Programming
//    a. stateful components
//       1) class-based component
//       2) function-based component + React Hooks
//    b. stateless components
//       3) function-based component
// 2. Functional Programming
// 3. Reactive Programming
//endregion
// stateful component
class Mastermind extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            game: {
                level: 3,
                guess: createSecret(3),
                secret: createSecret(3),
                tries: 0,
                maxTries: 10,
                moves: [],
                counter: 60,
                lives: 3,
                pbColorCounter: "bg-primary",
                pbWidthCounter: "100%"
             },
            statistics: {
                wins: 0,
                loses: 0
            }
        }
        // this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        setInterval(() => {
            const game = {...this.state.game};
            game.counter--;
            game.pbWidthCounter = Math.round(game.counter*5/3).toString().concat("%");
            if (game.counter <= 30)
                game.pbColorCounter = "bg-danger";
            else if (game.counter <= 45)
                game.pbColorCounter = "bg-warning";
            else
                game.pbColorCounter = "bg-primary";
            this.setState({game}, () => { // setState is an asynchronous function
                // console.log(`Model has changed: ${this.state.game.level}`)
            });
        }, 1_000);
    }
    handleInputChange = (event) => {
        const game = {...this.state.game};
        game[event.target.name] = Number(event.target.value);
        this.setState({game});
    }
    play = (event) => {
        const game = {...this.state.game};

        this.setState({game});
    }
    render() {
        return (
            <Container id="mastermind">
                <Card id="gameConsole">
                    <CardHeader title="Game Console"></CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Label label="Game Level" htmlFor="gameLevel"/>
                            <Badge id="gameLevel" bgColor="bg-success" value={this.state.game.level}/>
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
                                       handleChange={this.handleInputChange} />
                            <p></p>
                            <Button id="play" label="Play" bgColor="btn-success" click={this.play} />
                        </FormGroup>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

export default Mastermind;
