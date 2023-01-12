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

    render() {
        return (
            <div>
                MasterMind
            </div>
        );
    }
}

export default App;
