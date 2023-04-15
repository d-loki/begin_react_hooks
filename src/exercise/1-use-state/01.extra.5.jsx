import { useState } from 'react';

const useTodo = () => {
    const [todos, setTodos] = useState(['Learn React', 'Learn React Hooks']);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };

    return [todos, addTodo];

};

const TodoList = () => {
    const [todos, addTodo] = useTodo();
    return (
        <>
            <h2>TodoApp</h2>
            <Todos todos={todos} />
            <TodoForm addTodo={addTodo} />
        </>
    );
};

const Todos = ({ todos }) => (
    <ul>
        {todos.map((todo, i) => (
            <li key={i}>{todo}</li>
        ))}
    </ul>
);

const TodoForm = ({ addTodo }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const todo = e.target.todo.value;

        addTodo(todo);

        e.target.reset();
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" id="todo" />
            <button type="submit">Add</button>
        </form>
    );
};

const Counter = () => {
    const [count, setCount] = useState(0);

    return <button onClick={() => setCount((p) => p + 1)}>{count}</button>;
};

const Username = ({
    username,
    setUsername,
}) => {
    return (
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
    );
};

const FavoriteAnimal = ({
    favoriteAnimal,
    setFavoriteAnimal,
}) => {
    return (
        <input
            type="text"
            value={favoriteAnimal}
            onChange={(e) => setFavoriteAnimal(e.target.value)}
        />
    );
};

const Greeting = ({
    favoriteAnimal,
    username,
}) => {
    return (
        <p>
            <b>{username}</b>'s favorite animal is <b>{favoriteAnimal}</b>
        </p>
    );
};

const UserAnimalForm = () => {
    const [favoriteAnimal, setFavoriteAnimal] = useState('Dog');
    const [username, setUsername] = useState('');

    return (
        <div className="vertical-stack">
            <h2>Animal !</h2>
            <div>
                <span>Favorite Animal</span>
                <FavoriteAnimal
                    favoriteAnimal={favoriteAnimal}
                    setFavoriteAnimal={setFavoriteAnimal}
                />
                <div>
                    <span>Username</span>
                    <Username username={username} setUsername={setUsername} />
                </div>
                <Greeting favoriteAnimal={favoriteAnimal} username={username} />
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <TodoList />
            <h2>Counter</h2>
            <Counter />
            <UserAnimalForm />
        </div>
    );
};

export default App;
