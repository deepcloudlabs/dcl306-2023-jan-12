import {createContext, useReducer} from "react";
import Employee from "../model/employee";
import hrReducer from "../reducer/hr-reducer";
import {jack} from "../utility/hr-util";

export const HrContext = createContext(null);

export default function HrProvider({children}) {
    const employee = new Employee(jack);
    const employees = [];
    const [hr, hrDispatcher] = useReducer(hrReducer, {employee, employees});
    return (
        <HrContext.Provider value={{hr}}>
            {children}
        </HrContext.Provider>
    );
}