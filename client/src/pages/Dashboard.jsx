import classNames from "classnames"
import Home from "./Home"
import Navigation from "./Navigations/Navigation"
import NavMenu from "../components/NavMenu"
import { useState } from "react"

const Dashboard = () => {
  const [isActive, setIsActive] = useState('/');

  return (
    <div
      className={
        classNames(
          "w-full grid",
          {
            'grid-rows-[0.2fr_2fr]': isActive !== '/'
          },
        )
      }
    >
      <div
        className=
        {
          classNames(
            "h-full grid grid-cols-[2fr_0.5fr]",
          )
        }
      >
        <Home setIsActive={setIsActive} />
        <NavMenu setIsActive={setIsActive} />
      </div>
      <Navigation isActive={isActive} />
    </div>
  )
}

export default Dashboard