import classnames from 'classnames'
import { useState } from 'react'

const SettingsToggleButton = ({ settingName, settingToggle, margin_top, margin_bottom }) => {
    const [isSelected, setIsSelected] = useState(false)

    return (
        <div className='flex justify-around pr-10'>
            <div
                className={
                    classnames(
                        'grow flex items-center justify-center',
                        margin_top,
                        margin_bottom
                    )
                }
            >
                {settingName}
            </div>
            <div
                onClick={
                    () => {
                        setIsSelected(!isSelected)
                        settingToggle()
                    }
                }
                className={
                    classnames(
                        "shrink flex w-40 h-max bg-gray-600 mx-7 my-3 transition-all duration-500",
                        {
                            'bg-secondary': isSelected
                        },
                        margin_top,
                        margin_bottom
                    )
                }
            >
                <span className={
                    classnames(
                        "h-8 w-10 bg-black transition-all duration-50 shadow-lg",
                        {
                            'ml-32': isSelected
                        }
                    )
                }></span>
            </div >
        </div>
    )
}

export default SettingsToggleButton