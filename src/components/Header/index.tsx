import { FC } from 'react'
import styles from './Header.module.scss'

const Header: FC = () => {
	return (
		<div className={styles.header}>
			<div>
				<h1 className={styles.title}>CRM for Fitness</h1>
				<button className={styles.btn}>Add new client</button>
			</div>
		</div>
	)
}

export default Header
