import { Check, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  const remaining = todos.filter((t) => !t.completed).length;
  const total = todos.length;
  const progress =
    total === 0 ? 0 : Math.round(((total - remaining) / total) * 100);


  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-4 border border-gray-200 overflow-hidden">
      
      {/*Header*/}
      <div className="px-6 pt-6 pb-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold textgray-900">Tasks</h1>
          {total > 0 && (
            <span className="text-sm font-medium text-gray-500">
              {remaining} of {total} left
            </span>
          )}
        </div>
        {total > 0 && (
          <div className="mt-3 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>


      {/*Input Task */}
      <div className="px-6 pt-5 pb-6">
        <div className="flex  gap-2">
          <input
            className="flex-1 h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
            type="text"
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/*Task List*/}
      <div>
        {todos.length === 0 ? (
          <div>
            <p>No Tasks</p>
          </div>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="group flex items-center gap-3 px-2 py-2.5  rounded-lg hover:bg-gray-200"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`shrink-0 h-5 w-5 rounded-full border flex items-center justify-center transition ${
                    todo.completed
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-gray-300 hover:border-emerald-400"
                  }`}
                >
                  {todo.completed && (
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  )}
                </button>
                <span
                  className={`flex-1 text-sm leading-snug ${
                    todo.completed
                      ? "line-through text-gray-350 text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete task"
                  className="opacity-0 group-hover:opacity-100 flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;