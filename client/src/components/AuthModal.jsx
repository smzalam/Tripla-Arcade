/* eslint-disable react/prop-types */

import { useState } from "react";
import Modal from "./Modal"
import ShowForm from "./ShowForm";
import LogInButton from "./Buttons/LogInButton";
import SignUpButton from "./Buttons/SignUpButton";

const AuthModal = ({ modal, setModal }) => {

    const [showForm, setShowForm] = useState(false);

    return (
        <Modal
            openModal={modal}
            closeModal={() => setModal(false)}
        >
            {showForm ? (
                <>
                    <ShowForm
                        showForm={showForm}
                        setModal={setModal}
                        setShowForm={setShowForm}>
                    </ShowForm>
                </>
            ) : (
                <div className="grid grid-rows-2 justify-center align-center">
                    <LogInButton setShowForm={setShowForm} />
                    <SignUpButton setShowForm={setShowForm} />
                </div>
            )}
        </Modal>
    )
}

export default AuthModal