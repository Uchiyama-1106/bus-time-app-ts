import './App.css'
import NowTime from './ComponentList/NowTime'
import Atention from './ComponentList/Atention'
import BusRoute from './ComponentList/BusRoute/BusRoute'
import BusTime from './ComponentList/BusTime/BusTime'

function App() {


  return (
    <div className="">
      <header className="sticky top-0 left-0 right-0 h-40  bg-sky-200">
        <div className="pt-1 px-1">
          <NowTime />
          <BusRoute />
        </div>
      </header>

      <div className="... mt-1 mx-1.5">
        <BusTime />
      </div>

      <div className="... my-3 mx-2">
        <Atention />
      </div>

    </div>
  )
}

export default App
