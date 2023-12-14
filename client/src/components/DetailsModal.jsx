/* eslint-disable react/prop-types */

// import { useSettingsContext } from "../context/SettingsContext";
import Modal from "./Modal"
// import SettingsToggleButton from "./SettingsToggleButton";

const SettingsModal = ({ modal, setModal, game, imageSrc }) => {
    // const { timerSetting, wallsSetting, powerUpsSetting } = useSettingsContext();
    return (
        <Modal
            openModal={modal}
            closeModal={() => setModal(false)}
        >
            <div
                className="flex flex-row w-full h-full justify-center items-center"
            >
                <div
                    className="flex flex-col  justify-center items-center basis-1/2 gap-9"
                >
                    <text
                        className="text-4xl text-white mt-8"
                    >
                        {game}
                    </text>
                    <div
                        className="w-5/6 border-white border-2 rounded-md mb-10"
                    >
                        <img src={imageSrc} className="w-full h-full" />
                    </div>
                </div>
                <div
                    className="basis-1/4 text-white"
                >
                    <p>Text: </p>
                    <p>Text: </p>
                    <p>Text: </p>
                    <p>Text: </p>
                </div>
            </div>

        </Modal>
    )
}

export default SettingsModal