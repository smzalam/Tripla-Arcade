/* eslint-disable react/prop-types */

import { useSettingsContext } from "../context/SettingsContext";
import Modal from "./Modal"
import SettingsToggleButton from "./SettingsToggleButton";

const SettingsModal = ({ modal, setModal }) => {
    const { timerSetting, wallsSetting, powerUpsSetting, darkModeSetting } = useSettingsContext();
    return (
        <Modal
            openModal={modal}
            closeModal={() => setModal(false)}
        >
            <div className="grow font-body text-text">
                <SettingsToggleButton settingName={'Timer'} settingToggle={timerSetting} margin_top={'mt-10'} />
                <SettingsToggleButton settingName={'Walls'} settingToggle={wallsSetting} />
                <SettingsToggleButton settingName={'Power Ups'} settingToggle={powerUpsSetting} margin_bottom={'mb-10'}/>
                <SettingsToggleButton settingName={'Light Mode'} settingToggle={darkModeSetting} margin_bottom={'mb-10'}/>
            </div>
        </Modal>
    )
}

export default SettingsModal