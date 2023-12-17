
const ModalButtons = ({ setModal, content }) => {
    return (
        <button
            onClick={() => { setModal(true) }}
            className="cursor-pointer bg-accent text-text rounded-md h-max w-max px-10 py-3"
        >
            {content}
        </button>
    )
}

export default ModalButtons