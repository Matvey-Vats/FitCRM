import { FC } from 'react'
import Modal from 'react-modal'
import styles from './UpdateModal.module.scss'

Modal.setAppElement('#root')

type UpdateModalProps = {
	isOpen: boolean
	closeModal: () => void
}

const UpdateModal: FC<UpdateModalProps> = ({ isOpen, closeModal }) => {
	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal} className={styles.modal}>
			<div className={styles.modalContent}>
				<h3>Update client data</h3>
				<form>
					<input type='text' placeholder='Name' />
					<input type='email' placeholder='Email' />
					<input type='text' placeholder='Phone' />
				</form>
			</div>
		</Modal>
	)
}

export default UpdateModal
