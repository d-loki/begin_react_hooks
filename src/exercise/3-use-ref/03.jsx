/* eslint-disable no-unused-vars */                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                // 🦁 Enlève cette ligne
import { useEffect, useRef, useState } from 'react';

const useDebounce = (callback, time) => {
    const timeoutRef = useRef(null);

    const onDebounce = (...args) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, time);
    };

    return onDebounce;
};

const useRenderCount = () => {
    const counter = useRef(0);

    useEffect(() => {
        console.log('%c Call on any render', 'background: #fdd835; color: #000000');
        counter.current++;
    });

    return counter.current;

};

const fetchAgeByName = (name) => {
    return fetch(`https://api.agify.io/?name=${name}`)
        .then((res) => res.json());
};

const App = () => {
    const [result, setResult] = useState(null);
    const inputRef = useRef(null);
    const nbRender = useRenderCount();

    const onSearch = useDebounce(() => {
        fetchAgeByName(inputRef.current.value)
            .then((data) => {
                setResult(data);
            });
    }, 500);

    return (
        <div>
            <h3>Nombre de render : {nbRender}</h3>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search bar"
                onChange={(event) => onSearch()}
            />
            {result ? (
                <div style={{ padding: 16 }}>
                    The age for <b>{result.name}</b> is <b>{result.age}</b> and there is{' '}
                    <b>{result.count}</b> people with this name.
                </div>
            ) : null}
        </div>
    );
};

export default App;
