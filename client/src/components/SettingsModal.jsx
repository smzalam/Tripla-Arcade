/* eslint-disable react/prop-types */

import { useSettingsContext } from "../context/SettingsContext";
import Modal from "./Modal"
import SettingsToggleButton from "./SettingsToggleButton";

const SettingsModal = ({ modal, setModal }) => {
    const { timerSetting, wallsSetting, powerUpsSetting } = useSettingsContext();
    return (
        <Modal
            openModal={modal}
            closeModal={() => setModal(false)}
        >
            <SettingsToggleButton settingName={'Timer'} settingToggle={timerSetting} margin_top={'mt-10'}/>
            <SettingsToggleButton settingName={'Walls'} settingToggle={wallsSetting}/>
            <SettingsToggleButton settingName={'Power Ups'} settingToggle={powerUpsSetting}/>

        </Modal>
    )
}

export default SettingsModal