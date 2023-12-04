import classnames from 'classnames'
import { useState } from 'react'

const SettingsToggleButton = ({ settingName, settingToggle, margin_top }) => {
    const [isSelected, setIsSelected] = useState(false)

    return (
        <div className='grid grid-cols-[1fr_2fr]'>
            <div
                className={
                    classnames(
                        'text-white flex items-center justify-center',
                        margin_top
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
                        "flex w-40 h-max bg-gray-600 mx-7 my-3 transition-all duration-500",
                        {
                            'bg-green-500': isSelected
                        },
                        margin_top
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