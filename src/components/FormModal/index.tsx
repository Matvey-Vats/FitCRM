import { FC } from 'react'
import Modal from 'react-modal'
import styles from './FormModal.module.scss'

type FormModalTypes = {
	isOpen: boolean
	closeModal: () => void
	isUpdating: boolean
}

Modal.setAppElement('#root')

const FormModal: FC<FormModalTypes> = ({ isOpen, closeModal, isUpdating }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			className={styles.modal}
			style={{ overlay: { backgroundColor: 'transparent' } }}
		>
			<div className={styles.modalContent}>
				<h3>{isUpdating ? 'Update client data' : 'Add new client'}</h3>
				<form className={styles.modalForm}>
					<input type='text' placeholder='Name' />
					<input type='email' placeholder='Email' />
					<input type='text' placeholder='Phone' />
					<button>Add</button>
				</form>
				<button onClick={closeModal} className={styles.closeBtn}>
					Close
				</button>
			</div>
		</Modal>
	)
}

export default FormModal
