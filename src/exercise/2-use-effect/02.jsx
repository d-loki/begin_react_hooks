import { useEffect, useState } from 'react';

const getInitialName = (key, defaultValue) => {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
};

const useStickyState = (key, defaultValue) => {
    const [state, setState] = useState(() => getInitialName(key, defaultValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState];
};

const NAME_KEY = 'name';

const NameInput = ({ defaultValue }) => {
    const [name, setName] = useStickyState(NAME_KEY, defaultValue);

    return (
        <label className="textfield">
            Name
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </label>
    );
};

const Counter = () => {
    const [counter, setCounter] = useState(0);
    const [isWindowIncrementActive, setIsWindowIncrementActive] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            console.log('%c HANDLE RESIZE', 'background: #fdd835; color: #000000');
            setCounter(current => current + 1);
        };

        if (isWindowIncrementActive) {
            window.addEventListener('resize', handleResize);
        }

        return () => {
            // Clean UP
            window.removeEventListener('resize', handleResize);
        };
    }, [isWindowIncrementActive]);

    return (
        <>
            <button onClick={() => setCounter(counter + 1)}>{counter}</button>
            <input
                type="checkbox"
                checked={isWindowIncrementActive}
                onChange={e => setIsWindowIncrementActive(e.target.checked)}
            />
        </>
    );

};

const App = () => {
    return (
        <div className="vertical-stack">
            <Counter />
            <NameInput defaultValue="" />
        </div>
    );
};

export default App;
