import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { GoTasklist } from "react-icons/go";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [ShowFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  const saveTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const ToggleFinished = () => {
    setShowFinished(!ShowFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveTols()

  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    // saveTols()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveTols()
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveTols()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  return (
    <>
      <Navbar />
      <div className="mx-3 container md:mx-auto my-5 rounded-xl p-5 bg-slate-200 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-2xl my-5">iTask - Manage your todos at one place</h1>
        <div className="addTodo">
          <div className="flex">

          <h2 className="text-lg font-bold my-2 flex">Add a todo<GoTasklist className='my-1.5 mx-0.5'/></h2>
          </div>
          <div className="flex gap-3">
            <input name={todo.id} onChange={handleChange} value={todo} type="text" className='bg-amber-50 border border-amber-950 p-2 rounded flex-1 my-3' />
            <button onClick={handleAdd} className='bg-slate-500 text-white px-5 py-2 rounded hover:bg-slate-600 my-3'>Save</button>
          </div>
        </div>

        <input className="mx-0.5" type="checkbox" onChange={ToggleFinished} checked={ShowFinished} name="" id="show" />
        <label htmlFor="show">Show Finished</label>
        <div className="bg-black h-1 opacity-55 w-90% mx-auto my-2"></div>
        <h2 className="text-lg font-bold my-5">Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className='m-5'> No Todos to display</div>}
          {todos.map(item => {
            return (ShowFinished || !item.isCompleted) && <div key={item.id} className="my-2 w-1/2 todo flex justify-between">
              <div className='flex gap-5'>
                <input type="checkbox" onChange={handleCheckbox} checked={todo.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-slate-500 text-white px-4 py-1 rounded hover:bg-slate-600 mx-2 '><FaRegEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-slate-500 text-white px-4 py-1 rounded hover:bg-slate-600'><MdOutlineDelete /></button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
