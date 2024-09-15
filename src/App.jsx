import React, { useState } from "react";  
import { useDispatch, useSelector } from "react-redux";  
import {  
  addTodo,  
  deleteTodo,  
  toggleComplete,  
  editTodo,  
} from "./features/todosSlice";  
import { Provider } from "react-redux";  
import store from "./features/store";  
import github from "../public/github.svg";  
import google from "../public/google.svg";  
import { MdDelete, MdModeEdit } from "react-icons/md";  

function App() {  
  const todos = useSelector((state) => state.todos.todos);  
  const dispatch = useDispatch();  
  const [newTodo, setNewTodo] = useState("");  
  const [editTodoId, setEditTodoId] = useState(null);  
  const [editTodoText, setEditTodoText] = useState("");  
  const [showModal, setShowModal] = useState(false);  
  const [searchTerm, setSearchTerm] = useState("");  

  const handleAddTodo = () => {  
    if (newTodo.trim()) {  
      dispatch(addTodo({ id: Date.now(), text: newTodo, completed: false }));  
      setNewTodo("");  
      setShowModal(false);  
    }  
  };  

  const handleEditTodo = () => {  
    if (editTodoText.trim()) {  
      dispatch(editTodo({ id: editTodoId, newText: editTodoText }));  
      setEditTodoId(null);  
      setEditTodoText("");  
      setShowModal(false);  
    }  
  };  

  const openEditModal = (todo) => {  
    setEditTodoId(todo.id);  
    setEditTodoText(todo.text);  
    setShowModal(true);  
  };  

  return (  
    <div className="bg-black min-h-screen">  
      <div className="flex justify-between p-4">  
        <img src={github} alt="github-logo" />  
        <div className="flex space-x-2">  
          <button className="text-white">  
            <img className="inline" src={google} alt="google-logo" /> Sign in with Google  
          </button>  
        </div>  
      </div>  
      <div className="flex flex-col items-center">  
        <div className="bg-gray-800 border border-gray-400 rounded-lg p-4 w-full max-w-md">  
          <div className="flex items-center">  
            <input  
              type="text"  
              placeholder="Search Todos"  
              className="border p-2 rounded flex-1"  
              onChange={(e) => setSearchTerm(e.target.value)}  
            />  
            <button  
              className="bg-blue-500 rounded-full w-10 h-10 ml-2 text-white text-[25px] shrink-0"  
              onClick={() => {  
                setNewTodo("");  
                setEditTodoId(null);  
                setShowModal(true);  
              }}  
            >  
              +  
            </button>  
          </div>  
          <div className="mt-4">  
            {todos  
              .filter((todo) => todo.text.toLowerCase().includes(searchTerm.toLowerCase()))  
              .map((todo) => (  
                <div  
                  key={todo.id}  
                  className="flex justify-between items-center border-b border-gray-400 p-2 text-white"  
                >  
                  <input  
                    type="checkbox"  
                    checked={todo.completed}  
                    onChange={() => dispatch(toggleComplete(todo.id))}  
                  />  
                  <span className={todo.completed ? "line-through" : ""}>  
                    {todo.text}  
                  </span>  
                  <div>  
                    <button onClick={() => openEditModal(todo)}>  
                      <MdModeEdit />  
                    </button>  
                    <button onClick={() => dispatch(deleteTodo(todo.id))}>  
                      <MdDelete />  
                    </button>  
                  </div>  
                </div>  
              ))}  
          </div>  
        </div>  

        {showModal && (  
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">  
            <div className="bg-white p-4 rounded-lg border border-gray-400 w-full max-w-md">  
              <h2>{editTodoId ? "Edit Todo" : "Create Todo"}</h2>  
              <input  
                type="text"  
                placeholder="What has been done"  
                value={editTodoId ? editTodoText : newTodo}  
                onChange={(e) => {  
                  if (editTodoId) {  
                    setEditTodoText(e.target.value);  
                  } else {  
                    setNewTodo(e.target.value);  
                  }  
                }}  
                className="border p-2 rounded w-full"  
              />  
              <div className="flex justify-between mt-4">  
                <button  
                  onClick={() => setShowModal(false)}  
                  className="bg-red-500 text-white p-2 rounded"  
                >  
                  Cancel  
                </button>  
                <button  
                  onClick={editTodoId ? handleEditTodo : handleAddTodo}  
                  className="bg-green-500 text-white p-2 rounded"  
                >  
                  {editTodoId ? "Save" : "Create"}  
                </button>  
              </div>  
            </div>  
          </div>  
        )}  
      </div>  
    </div>  
  );  
}  

function Root() {  
  return (  
    <Provider store={store}>  
      <App />  
    </Provider>  
  );  
}  

export default Root;
