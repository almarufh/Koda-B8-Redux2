import React from 'react';
import { useForm } from 'react-hook-form';
import { MdDelete, MdEdit, MdCheck } from "react-icons/md";
import Navbar from '../component/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, removeTask } from '../redux/reducers/todos';

function Dashboard() {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.todos);

    const [editId, setEditId] = React.useState(null);
    const [editText, setEditText] = React.useState("");

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors } 
    } = useForm({
        mode: "onChange" 
    });
    
    function onSubmit(data) {
        dispatch(addTask({
            id: Date.now(),
            text: data.taskText,
            completed: false
        }));
        reset();
    }

    function toggleTask(id) {
        const taskYangDipilih = tasks.find((item) => item.id === id);
        if (!taskYangDipilih) return;
        
        dispatch(editTask({ id, completed: !taskYangDipilih.completed }));
    }

    function deleteTask(event, id) {
        event.stopPropagation();
        dispatch(removeTask(id));
        if (editId === id) setEditId(null);
    }

    function startEdit(event, id, currentText) {
        event.stopPropagation();
        setEditId(id);
        setEditText(currentText);
    }

    function saveEdit(event, id) {
        event.stopPropagation();
        if (editText.trim().length >= 3) {
            dispatch(editTask({ id, text: editText }));
            setEditId(null);
        } else {
            alert("Minimal 3 huruf ya!");
        }
    }

    return (
        <div className="flex items-center justify-start flex-col w-full min-h-screen text-[16px] gap-8 p-4">
            <Navbar />
            <main className="flex flex-col w-[75%] items-center gap-4">
                <span className="text-5xl text-red-500 font-bold">To DO List</span>

                <div className="w-full flex flex-col gap-1">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between w-full border border-gray-300 rounded-full pl-4 shadow-xl bg-white overflow-hidden">
                        <input 
                            className='text-xl w-full outline-0 py-2' 
                            type="text" 
                            placeholder='Add new task' 
                            {...register("taskText", { 
                                required: "Task tidak boleh kosong",
                                minLength: { value: 3, message: "Minimal 3 huruf ya!" }
                            })}
                        />
                        <button 
                            type="submit" 
                            className='bg-red-500 text-white text-xl font-bold px-6 py-2 rounded-full hover:bg-red-600 transition-colors'
                        >
                            Add
                        </button>
                    </form>
                    
                    {errors.taskText && (
                        <p className="text-red-500 text-sm pl-4 font-medium animate-pulse">
                            {errors.taskText.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2 p-2 pt-4 w-full bg-white rounded-2xl shadow-2xl">
                    {tasks.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">Belum ada tugas hari ini.</p>
                    ) : (
                        tasks.map((item) => (
                            <div 
                                key={item.id} 
                                className={`flex justify-between w-full h-fit items-center px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 ${
                                    item.completed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                }`} 
                                onClick={() => editId !== item.id && toggleTask(item.id)}
                            >
                                <div className="flex items-center gap-3 w-full mr-4">
                                    <input 
                                        type="checkbox" 
                                        checked={item.completed || false} 
                                        onClick={(e) => e.stopPropagation()} 
                                        onChange={() => toggleTask(item.id)} 
                                        className="w-5 h-5 accent-white cursor-pointer snap-none"
                                    />

                                    {editId === item.id ? (
                                        <input 
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            onClick={(e) => e.stopPropagation()} 
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') saveEdit(e, item.id);
                                                if (e.key === 'Escape') setEditId(null);
                                            }}
                                            className="text-2xl font-bold bg-white text-black px-3 py-0.5 rounded-full outline-none w-full border border-blue-500"
                                            autoFocus
                                        />
                                    ) : (
                                        <span className={`font-bold text-2xl ${item.completed ? 'opacity-80' : ''}`}>
                                            {item.text}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                    {editId === item.id ? (
                                        <MdCheck 
                                            size={24} 
                                            className="text-white bg-green-700 rounded-full p-0.5 cursor-pointer hover:scale-110 transition-transform" 
                                            onClick={(e) => saveEdit(e, item.id)} 
                                        />
                                    ) : (
                                        <MdEdit 
                                            size={24} 
                                            className="text-white cursor-pointer hover:scale-110 transition-transform" 
                                            onClick={(e) => startEdit(e, item.id, item.text)} 
                                        />
                                    )}
                                    <MdDelete 
                                        size={24} 
                                        className="text-white cursor-pointer hover:scale-110 transition-transform" 
                                        onClick={(e) => deleteTask(e, item.id)} 
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;