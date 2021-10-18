import { createContext } from "react";

function noop() {}

export const PracticeContext = createContext({
    practiceState: null,
    setPracticeState: noop,
    multiplicand: null,
    setMultiplicand: noop,
    multiplicator: null,
    setMultiplicator: noop
});