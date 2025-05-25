import './App.css'
import NowTime from './ComponentList/NowTime'
import Atention from './ComponentList/Atention'
import BusRoute from './ComponentList/BusRoute/BusRoute'
import BusTime from './ComponentList/BusTime/BusTime'

function App() {


  return (
    // パソコンだとCSSが崩れるため、最大の横幅（576px）を設定する。
    <div className="max-w-xl mx-auto">
      <header className="sticky top-0 left-0 right-0 h-40  bg-sky-200">
        <div className="pt-1 px-1">
          <NowTime />
          <BusRoute />
        </div>
      </header>

      <div className="... mx-1.5">
        <BusTime />
      </div>

      <div className="... my-3 mx-2">
        <Atention />
      </div>

    </div>
  )
}

export default App
