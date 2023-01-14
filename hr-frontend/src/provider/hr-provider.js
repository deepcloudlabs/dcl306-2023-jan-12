import {createContext, useContext, useReducer} from "react";
import Employee from "../model/employee";
import hrReducer from "../reducer/hr-reducer";
import {departments, jack} from "../utility/hr-util";

export const HrContext = createContext(null);

export function useDepartments() {
    const {departments} = useContext(HrContext);
    return departments;
}

export function useHr() {
    const {hr} = useContext(HrContext);
    return hr;
}
export function useEmployees() {
    const {hr} = useContext(HrContext);
    return hr.employees;
}

export function useHrDispatcher() {
    const {hrDispatcher} = useContext(HrContext);
    return hrDispatcher;
}

export default function HrProvider({children}) {
    const employee = new Employee(jack);
    const employees = [];
    const [hr, hrDispatcher] = useReducer(hrReducer, {employee, employees});
    return (
        <HrContext.Provider value={{hr, hrDispatcher, departments}}>
            {children}
        </HrContext.Provider>
    );
}