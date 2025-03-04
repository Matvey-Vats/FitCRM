import { FC } from 'react'
import { IoIosWarning } from 'react-icons/io'
import Modal from 'react-modal'
import { useClientStore } from '../../store/store'
import styles from './DeleteModal.module.scss'

Modal.setAppElement('#root')

type DeleteModalTypes = {
	id: number
	isOpen: boolean
	closeModal: () => void
}

const DeleteModal: FC<DeleteModalTypes> = ({ id, isOpen, closeModal }) => {
	const { removeClient } = useClientStore()

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			style={{ overlay: { backgroundColor: 'transparent' } }}
			className={styles.modal}
		>
			<div className={styles.modalContent}>
				<h3>Are you sure?</h3>
				<IoIosWarning size={100} color='red' />
				<p>
					If you delete client data, you will no longer be able to get it back!
				</p>
				<div className={styles.modalActions}>
					<button onClick={() => removeClient(id)} className={styles.deleteBtn}>
						Yes, i'm sure
					</button>
					<button onClick={closeModal} className={styles.cancelBtn}>
						No, cancel
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default DeleteModal
