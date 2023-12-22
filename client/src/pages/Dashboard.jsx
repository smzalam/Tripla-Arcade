import classNames from "classnames"
import Home from "./Home"
import Navigation from "./Navigations/Navigation"
import NavMenu from "../components/Navigation/NavMenu"
import { useNavigationContext } from "../context/NavigationContext"
import { LayoutGroup, motion } from "framer-motion";

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
      <LayoutGroup>
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' , layout: { type: 'spring', duration: 0.5, stiffness: 45 } }}
          className=
          {
            classNames(
              "flex justify-evenly",
              {
                'flex-row w-screen': isActive === '/'
              },
              {
                'ml-10 flex-col h-screen': isActive !== '/'
              },
            )
          }
        >
          <Home isActive={isActive} setIsActive={setIsActive} />
          <NavMenu isActive={isActive} setIsActive={setIsActive} />

        </motion.div>
        <Navigation isActive={isActive} />
      </LayoutGroup>
    </div>
  )
}

export default Dashboard