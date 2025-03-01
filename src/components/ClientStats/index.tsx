import clsx from 'clsx'
import { FC, useState } from 'react'
import styles from './ClientStats.module.scss'

const ClientStats: FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={styles.block}>
			<button onClick={() => setIsOpen(!isOpen)} className={styles.openBtn}>
				{isOpen ? 'Hide stats' : 'Open stats'}
			</button>
			<div className={clsx(styles.wrapper, { [styles.open]: isOpen })}>
				<div className={styles.item}>
					<h3>Total clients</h3>
					<p>10</p>
				</div>
				<div className={styles.item}>
					<h3>Total clients active</h3>
					<p>7</p>
				</div>
				<div className={styles.item}>
					<h3>Total clients inactive</h3>
					<p>3</p>
				</div>
			</div>
		</div>
	)
}

export default ClientStats
