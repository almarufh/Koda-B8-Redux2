function Navbar() {
  return ( 
    <header className="flex items-center justify-between gap-2 w-full p-4 font-bold ">
        <div className="flex items-center gap-2  ">
            <span>Hello, almaruf</span>
            <span className='text-red-500 text-2xl '>Good Morning !</span>
        </div>
        <div className="flex items-center gap-2">
            <span>Time :</span>
            <span className="text-red-500">06.30 AM</span>
        </div>
    </header>
  )
}

export default Navbar