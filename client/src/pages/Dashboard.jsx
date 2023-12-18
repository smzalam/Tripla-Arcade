import classNames from "classnames"
import Home from "./Home"
import Navigation from "./Navigations/Navigation"
import NavMenu from "../components/Navigation/NavMenu"
import { useNavigationContext } from "../context/NavigationContext"


const Dashboard = () => {
  const { isActive, setIsActive } = useNavigationContext();



  return (
    <div
      className={
        classNames(
          "bg-background w-full grid grid-cols-[0.2fr_2fr]",
        )
      }
    >
      <div
        className=
        {
          classNames(
            {
              'flex flex-row w-screen justify-evenly': isActive === '/'
            },
            {
              'flex flex-col justify-evenly': isActive !== '/'
            },
          )
        }
      >
        <Home isActive={isActive} setIsActive={setIsActive} />
        <NavMenu isActive={isActive} setIsActive={setIsActive} />
      </div>
      <Navigation isActive={isActive} />
    </div>
  )
}

export default Dashboard