import IMAGES from "../assets/images/images"
import SettingsButton from "./SettingsButton"

const Header = () => {
    return (
        <div className="h-full w-full grid grid-cols-[1.5fr_0.5fr]">
            <h1 className="m-6 text-2xl">
                tripla arcade
            </h1>
            <SettingsButton content={'Settings'} imageSrc={IMAGES.settings} imageAlt={'settings'} />
        </div>
    )
}

export default Header