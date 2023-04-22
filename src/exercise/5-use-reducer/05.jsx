import { useReducer } from 'react';

const REDUCER_ACTION = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    RESET:     'reset',
};

const reducer = (currentValue, {
    action,
    value = 1,
}) => {
    switch (action) {
    case REDUCER_ACTION.INCREMENT:
        return currentValue + value;
    case REDUCER_ACTION.DECREMENT:
        return currentValue - value;
    case REDUCER_ACTION.RESET:
        return 0;
    default:
        throw new Error('Unexpected action');
    }
};

const Counter = () => {
    const [count, dispatch] = useReducer(reducer, 0);

    return (
        <>
            <div>
                <button
                    onClick={() => dispatch({
                        action: REDUCER_ACTION.DECREMENT,
                        value:  5,
                    })}
                >-5
                </button>
                <button
                    onClick={() => dispatch({
                        action: REDUCER_ACTION.DECREMENT,
                    })}
                >-
                </button>
                <button>{count}</button>
                <button
                    onClick={() => dispatch({
                        action: REDUCER_ACTION.INCREMENT,
                    })}
                >+
                </button>
                <button
                    onClick={() => dispatch({
                        action: REDUCER_ACTION.INCREMENT,
                        value:  5,
                    })}
                >+5
                </button>
            </div>
            <div style={{ marginTop: 20 }}>
                <button onClick={() => dispatch({ action: REDUCER_ACTION.RESET })}>RESET</button>
            </div>
        </>
    );
};

const App = () => {
    return (
        <div>
            <Counter />
        </div>
    );
};

export default App;
