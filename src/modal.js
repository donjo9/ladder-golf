import React from "react";
import styled from "styled-components";

const ModalBackdropContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: #7676767d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ModalContentContainer = styled.div`
    position: relative;
    width: 80%;
    max-width: 400px;
    padding: 25px 10px;
    border-radius: 25px;
    background-color: var(--draculaorchid);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 0 0 5px 0 #ddd;
`;

const Modal = props => {
    return (
        <>
            {props.visable ? (
                <ModalBackdropContainer>
                    <ModalContentContainer>
                        {props.children}
                    </ModalContentContainer>
                </ModalBackdropContainer>
            ) : null}
        </>
    );
};

export default Modal;
