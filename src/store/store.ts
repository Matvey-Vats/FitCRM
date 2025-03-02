import { create } from 'zustand'

export enum Membership {
	MONTH = 30,
	THREE_MONTH = 90,
	SIX_MONTH = 180,
	YEAR = 365,
}

export interface IClient {
	id: number
	name: string
	email: string
	phone: string
	firstDay: string
	subscription: Membership
	status: boolean
}

export interface IMembership {
	value: Membership
	label: string
}

const loadClientsFromLocalStorage = () => {
	const clients = localStorage.getItem('clients')
	return (clients ? JSON.parse(clients) : []) as IClient[]
}

const loadStatsFromLocalStorage = () => {
	const stats = localStorage.getItem('clients_stats')
	return stats
		? JSON.parse(stats)
		: { total: 0, totalActive: 0, totalInactive: 0 }
}

interface ClientsStore {
	clients: IClient[]
	memberships: IMembership[]
	total: number
	totalActive: number
	totalInactive: number
	addClient: (client: IClient) => void
	removeClient: (id: number) => void
	updateClient: (id: number, updatedClient: IClient) => void
}

export const useClientStore = create<ClientsStore>(set => ({
	clients: loadClientsFromLocalStorage(),
	memberships: [
		{ value: Membership.MONTH, label: '1 Month' },
		{ value: Membership.THREE_MONTH, label: '3 Months' },
		{ value: Membership.SIX_MONTH, label: '6 Months' },
		{ value: Membership.YEAR, label: '1 Year' },
	],
	total: loadStatsFromLocalStorage().total,
	totalActive: loadStatsFromLocalStorage().totalActive,
	totalInactive: loadStatsFromLocalStorage().totalInactive,

	addClient: (client: IClient) =>
		set(state => {
			const updatedClients = [...state.clients, client]
			const updatedTotal = state.total + 1
			const updatedActive = client.status
				? state.totalActive + 1
				: state.totalActive
			const updatedInactive = !client.status
				? state.totalInactive + 1
				: state.totalInactive

			localStorage.setItem('clients', JSON.stringify(updatedClients))
			localStorage.setItem(
				'clients_stats',
				JSON.stringify({
					total: updatedTotal,
					totalActive: updatedActive,
					totalInactive: updatedInactive,
				})
			)
			return {
				clients: updatedClients,
				total: updatedTotal,
				totalActive: updatedActive,
				totalInactive: updatedInactive,
			}
		}),

	removeClient: (id: number) =>
		set(state => {
			const updatedClients = state.clients.filter(client => client.id !== id)
			const updatedTotal = state.total - 1
			const clientToRemove = state.clients.find(client => client.id === id)
			const updatedActive = clientToRemove?.status
				? state.totalActive - 1
				: state.totalActive
			const updatedInactive = !clientToRemove?.status
				? state.totalInactive - 1
				: state.totalInactive

			localStorage.setItem('clients', JSON.stringify(updatedClients))
			localStorage.setItem(
				'clients_stats',
				JSON.stringify({
					total: updatedTotal,
					totalActive: updatedActive,
					totalInactive: updatedInactive,
				})
			)

			return {
				clients: updatedClients,
				total: updatedTotal,
				totalActive: updatedActive,
				totalInactive: updatedInactive,
			}
		}),

	updateClient: (id: number, updatedClient: IClient) =>
		set(state => {
			const updatedClients = state.clients.map(client =>
				client.id === id ? { ...client, ...updatedClient } : client
			)

			const updatedActive = updatedClient.status
				? state.totalActive + 1
				: state.totalActive - 1
			const updatedInactive = !updatedClient.status
				? state.totalInactive + 1
				: state.totalInactive - 1

			localStorage.setItem('clients', JSON.stringify(updatedClients))
			localStorage.setItem(
				'clients_stats',
				JSON.stringify({
					totalActive: updatedActive,
					totalInactive: updatedInactive,
				})
			)

			return {
				clients: updatedClients,
				totalActive: updatedActive,
				totalInactive: updatedInactive,
			}
		}),
}))
