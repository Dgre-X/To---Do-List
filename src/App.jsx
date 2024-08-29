import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let storedTodos = JSON.parse(localStorage.getItem("todos"))
    console.log(storedTodos);
    
    if(storedTodos){
      let Todos = JSON.parse(localStorage.getItem("todos"))
      settodos(Todos)
    }
  }, [])
  
  const saveToLS = (updatedTodo) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodo))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleAdd = () => {
    let updatedTodo = [...todos, {id: uuidv4(), todo, iscompleted : false}]
    settodos(updatedTodo)
    settodo("")
    saveToLS(updatedTodo)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    // console.log(id);
    
    let index = todos.findIndex(item => {
      return item.id === id
    })
    // console.log(index);
    let newTodos = [...todos]
    newTodos[index].iscompleted = !newTodos[index].iscompleted
    settodos(newTodos)
    saveToLS(newTodos)
  }
  
  const handleEdit = (e, id) => {
    let todo = todos.filter(item => item.id == id)
    settodo(todo[0].todo)

    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)
    saveToLS(newtodos)

  }
  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)
    saveToLS(newtodos)
  }

  return (
    <>
      <Navbar/>
      <div className="md:container bg-violet-200 md:mx-auto my-5 p-5 rounded-xl md:w-1/2 h-[80vh] mx-3">
        <div className="">
          <h1 className='font-bold text-center text-2xl my-3'>iTask - Manage your task at one place</h1>
          <div className="addTodo">
            <h2 className='font-bold text-xl my-3'>Add Todo</h2>
            <div className='flex'>
              <input onChange={handleChange} value={todo} type="text" className='md:w-1/2 rounded-lg px-3 w-full' />
              <button onClick={handleAdd} disabled={todo.length <= 2}  className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 text-white text-sm font-bold px-3 py-1 rounded-xl mx-5'>Add</button>
            </div>
          </div>
          <div className='my-5'>
            <input type="checkbox" onChange={toggleFinished} checked={showFinished}/> Show Finished
          </div>
          <div className="yourTodo">
            <h2 className='font-bold text-xl my-3'>Your Todos</h2>
            {todos.length ===0 && <div className='m-5'>No To-Do to Display</div>}
            {todos.map(item=>{
            return (showFinished || !item.iscompleted) && <div key={item.id} className="todos flex md:w-1/2 justify-between my-3">
                <div className='flex gap-5'>
                  <input type="checkbox" onChange={handleCheckbox} checked={item.iscompleted} name={item.id} id="" />
                  <div className={item.iscompleted?"line-through":""}>
                    {item.todo}
                  </div>
                </div>
                <div className="button flex h-full">
                  <button onClick={(e) => {handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 text-white text-sm font-bold px-3 py-1 rounded-xl mx-1'><FaEdit /></button>
                  <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 text-white text-sm font-bold px-3 py-1 rounded-xl mx-1'><RiDeleteBin5Fill /></button>
                </div>
              </div>
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default App
