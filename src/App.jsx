import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./Navbar";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let index = todos.findIndex((items) => {
      return items.id === id;
    });

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };
  

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((items) => {
      return items.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <div>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto bg-violet-300 my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
      <h1 className="text-3xl font-bold text-center mb-5">Manage your todo`s at one place</h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold my-5">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-3/4 rounded-lg py-2"
          />
          <button
            onClick={handleAdd}
            disabled = {todo.length<2}
            className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-6 disabled:bg-violet-500"
          >
            Add
          </button>
        </div>
        <input type="checkbox" checked={showFinished} onChange={toggleFinished} name="" id="" />
        Show Finished
        <h2 className="text-lg font-bold">Your Todo`s</h2>
        <div className="todos">
          {todos.length === 0 && <div>No Todo`s to Display</div>}
          {todos.map((item, index) => {
            return (showFinished || !item.isCompleted) &&
              <div key={item.id} className="todo flex justify-between md:w-1/2">
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
          })}
        </div>
      </div>
    </div>
  );
}
export default App;
