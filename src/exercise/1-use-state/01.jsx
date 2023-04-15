import { useState } from 'react';

const useStateHistory = () => {
    const [nameHistory, setNameHistory] = useState([]);

    const addHistory = (value = '-') => {
        setNameHistory((current) => {
            return [...current, value];
        });

    };

    const deleteHistory = (index) => {
        if (typeof index !== 'number') return;

        setNameHistory(current => {
            current.splice(index, 1);
            return [...current];
        });
    };

    return [nameHistory, addHistory, deleteHistory];
};

const App = () => {
    const [name, setName] = useState('');
    const [isNameReversed, setIsNameReversed] = useState(false);
    const [nameHistory, addHistory, deleteHistory] = useStateHistory();

    const handleChangeName = (event) => {
        const newName = event.target.value;
        setName(newName);
        addHistory(newName);
    };

    const handleChangeChecked = (event) => {
        setIsNameReversed(event.target.checked);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleChangeName}
            />
            <input type="checkbox" checked={isNameReversed} onChange={handleChangeChecked} />
            <Name name={name} isNameReversed={isNameReversed} />
            <ul>
                {nameHistory.map((name, i) => (
                    <li key={i} onClick={() => deleteHistory(i)}>
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Name = ({
    name,
    isNameReversed,
}) => {

    if (!name) {
        return <p>Write your name</p>;
    }

    const computedName = isNameReversed
        ? name.split('')
            .reverse()
            .join('')
        : name;

    return (<p>Hello {computedName}</p>);
};

export default App;
