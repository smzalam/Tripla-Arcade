import classNames from "classnames"
import Home from "./Home"
import Navigation from "../navigation/RouteNavigation"
import NavMenu from '../components/Navigation/NavMenu'
import { useNavigationContext } from "../context/NavigationContext"
import { LayoutGroup, motion } from "framer-motion";
import { useSettingsContext } from "../context/SettingsContext"

const Dashboard = () => {
  const { isActive, setIsActive } = useNavigationContext();
  const { inGame } = useSettingsContext();

  return (
    <motion.div
      layout
      className={
        classNames(
          "bg-background w-full grid",
          {
            'grid-cols-[0.2fr_2fr]': !inGame
          },
          {
            'grid': inGame
          }

        )
      }
    >
      <LayoutGroup>
        <motion.div
          layout='position'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut', layout: { type: 'spring', duration: 0.5, stiffness: 45 } }}
          className=
          {
            classNames(
              "flex justify-evenly",
              {
                'flex-row w-screen': isActive === '/'
              },
              {
                'ml-5 mr-4 flex-col h-screen': isActive !== '/'
              },
              {
                'hidden': inGame
              }
            )
          }
        >
          <Home isActive={isActive} setIsActive={setIsActive} />
          <NavMenu />

        </motion.div>
        <Navigation isActive={isActive} />
      </LayoutGroup>
    </motion.div>
  )
}

export default Dashboard