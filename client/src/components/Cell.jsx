/* eslint-disable react/prop-types */

function Cell({ cell, handleClick }) {
    return (
        <div className="bg-white h-[75px] w-[75px]">
            <button className="w-full h-full" type="button" onClick={handleClick}>
                {cell}
            </button>
        </div>
    )
}

export default Cell
