import { FC, useEffect } from 'react'
import { useClientStore, useSearchStore } from '../../store/store'
import ClientItem from '../ClientItem'
import styles from './ClientsList.module.scss'

const ClientsList: FC = () => {
	const clients = useClientStore(state => state.clients)
	const {
		sort,
		searchingClientsBySort,
		searchValue,
		filteredClients,
		searchingClients,
	} = useSearchStore()

	useEffect(() => {
		searchingClients(clients)
		searchingClientsBySort(clients)
	}, [sort, clients, searchValue])

	const displayedClients = searchValue || sort ? filteredClients : clients
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
					{displayedClients.length > 0 &&
						displayedClients.map(client => (
							<ClientItem key={client.id} {...client} />
						))}
				</tbody>
			</table>
		</div>
	)
}

export default ClientsList
