import { FC } from 'react'
import { useClientStore } from '../../store/store'
import ClientItem from '../ClientItem'
import styles from './ClientsList.module.scss'

const ClientsList: FC = () => {
	const clients = useClientStore(state => state.clients)

	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>First Day</th>
						<th>Days of Subscribe</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{clients.length > 0 &&
						clients.map(client => <ClientItem key={client.id} {...client} />)}
				</tbody>
			</table>
		</div>
	)
}

export default ClientsList
