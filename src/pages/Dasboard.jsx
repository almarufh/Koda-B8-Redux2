import React from 'react';
import { MdDelete } from "react-icons/md";
import Navbar from '../component/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, removeTask } from '../redux/reducers/todos';

function Dashboard() {
    // const [tasks, setTasks] = React.useState([]);
    const dispatch = useDispatch
    const taskRef = React.useRef();
    const radioRefs = React.useRef({});
    
    const tasks = useSelector(state => state.todos)

    function clickAdd() {
        const text = taskRef.current.value;
        if (text.length >= 3) {
            dispatch(addTask({
                id: Date.now(), 
                text: text, 
                completed: false 
            }));
            // setTasks([
            //     ...tasks, 
            //     { 
            //         id: Date.now(), 
            //         text: text, 
            //         completed: false 
            //     }
            // ]);
            taskRef.current.value = "";
        } else {
            alert("Minimal 3 huruf ya!");
        }
    }

    function toggleTask(id) {
        const taskYangDipilih = tasks.find((item) => item.id === id);
        const statusBaru = !taskYangDipilih.completed;

        if (radioRefs.current[id]) {
            radioRefs.current[id].checked = statusBaru;
        }

        dispatch(editTask({ 
            id, completed: 
            statusBaru 
        }));

        // setTasks((prevTasks) =>
        //     prevTasks.map((item) =>
        //         item.id === id ? { 
        //             ...item, 
        //             completed: statusBaru 
        //         } : item
        //     )
        // );
    }

    function deleteTask(event, id) {
        event.stopPropagation();
        delete radioRefs.current[id];
        dispatch(removeTask(id));
        if (editId === id) {
            setEditId(null);
        }
        // setTasks(tasks.filter(t => t.id !== id));
    }

    return (
        <div className="flex items-center justify-start flex-col w-full min-h-screen text-[16px] gap-8 p-4">
            <Navbar />
            <main className="flex flex-col w-[75%] items-center gap-4">
                <span className="text-5xl text-red-500 font-bold">To DO List</span>
                
                <div className="flex justify-between w-full border border-gray-300 rounded-full pl-4 shadow-xl">
                    <input ref={taskRef} className='text-xl w-full outline-0' type="text" placeholder='Add new task' />
                    <button onClick={clickAdd} className='bg-red-500 text-white text-xl font-bold px-6 py-2 rounded-full'>Add</button>
                </div>

                <div className="flex flex-col gap-2 p-2 pt-4 w-full bg-white rounded-2xl shadow-2xl">
                    {tasks.map((item) => (
                        <div 
                            key={item.id} 
                            className="flex justify-between w-full h-fit items-center px-4 py-2 rounded-full bg-gray-300  cursor-pointer" 
                            onClick={() => toggleTask(item.id)}
                        >
                            <input 
                                type="radio" 
                                ref={(el) => radioRefs.current[item.id] = el}
                                defaultChecked={item.completed}
                            />
                            <span className="font-bold text-2xl">{item.text}</span>
                            <MdDelete 
                                size={24} 
                                className="text-red-500 cursor-pointer" 
                                onClick={(e) => deleteTask(e, item.id)} 
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;