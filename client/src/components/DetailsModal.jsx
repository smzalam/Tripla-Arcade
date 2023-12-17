/* eslint-disable react/prop-types */

// import { useSettingsContext } from "../context/SettingsContext";
import Modal from "./Modal"
// import SettingsToggleButton from "./SettingsToggleButton";

const SettingsModal = ({ modal, setModal, game }) => {
    // const { timerSetting, wallsSetting, powerUpsSetting } = useSettingsContext();
    return (
        <Modal
            openModal={modal}
            closeModal={() => setModal(false)}
        >
            <div
                className="flex justify-center items-stretch flex-row flex-nowrap content-center h-full gap-[5px] p-[15px]"
            >
                <div
                    className="order-none grow-[2] self-auto"
                >
                    <text
                        className="text-4xl text-white mt-8"
                    >
                        {game}
                    </text>
                    <div
                        className="w-5/6 border-white border-2 rounded-md mb-10"
                    >
                        <img className="w-full h-full" />
                    </div>
                </div>
                <div
                    className="order-none grow shrink"
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