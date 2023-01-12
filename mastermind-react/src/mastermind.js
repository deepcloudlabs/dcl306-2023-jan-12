import React from "react";

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
                guess: 123,
                secret: 549,
                tries: 0,
                maxTries: 10,
                moves: [],
                counter: 60,
                lives: 3
            },
            statistics: {
                wins: 0,
                loses: 0
            }
        }
    }

    componentDidMount() {
        setInterval(() => {
            const game = {...this.state.game};
            game.level++;
            console.log(`Before setState(): ${this.state.game.level}`)
            this.setState({game},()=>{
                console.log(`After setState(): ${this.state.game.level}`)
            });
        } , 3_000);
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Game Console</h3>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="gameLevel">Game Level: </label>
                            <span id="gameLevel" className="badge bg-success">{this.state.game.level}</span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="tries">Tries: </label>
                            <span id="tries" className="badge bg-warning">{this.state.game.tries}</span>
                            <span className="form-label"> out of </span>
                            <span id="tries" className="badge bg-danger">{this.state.game.maxTries}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mastermind;
