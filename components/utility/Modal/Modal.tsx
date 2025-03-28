import { ReactNode } from 'react';
interface ModalProps {
    component: ReactNode
    setModal: () => void
  }
export default function Modal({component, setModal}: ModalProps){
    return(
    <>
        <div className="modal-backdrop" />
        <div className="general-modal">
            <span onClick={setModal} className='general-modal__exit-modal'>X</span>
            {component}
        </div>
    </>
    )
}