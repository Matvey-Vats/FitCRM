import dayjs from 'dayjs'
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

			const findClient = state.clients.find(client => client.id === id)

			let updatedActive = state.totalActive
			let updatedInactive = state.totalInactive

			if (findClient && findClient.status !== updatedClient.status) {
				if (updatedClient.status) {
					updatedActive += 1
					updatedInactive -= 1
				} else {
					updatedActive -= 1
					updatedInactive += 1
				}
			}
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

interface ISort {
	id: number
	name: string
}
interface SearchStoreState {
	searchValue: string
	sort: ISort
	filteredClients: IClient[]
	setSearchValue: (value: string) => void
	setSort: (value: ISort) => void
	searchingClients: (clients: IClient[]) => void
	searchingClientsBySort: (clients: IClient[]) => void
}

export const useSearchStore = create<SearchStoreState>(set => ({
	searchValue: '',
	sort: { id: 1, name: 'All' },
	filteredClients: [],

	setSearchValue: (value: string) =>
		set({
			searchValue: value,
		}),

	setSort: (value: ISort) =>
		set({
			sort: value,
		}),

	searchingClients: (clients: IClient[]) =>
		set(state => {
			const filtered = clients.filter(client =>
				client.name.toLowerCase().includes(state.searchValue.toLowerCase())
			)
			return {
				filteredClients: filtered.length ? filtered : clients,
			}
		}),
	searchingClientsBySort: (clients: IClient[]) =>
		set(state => {
			let filtered: IClient[] = clients

			if (state.sort.name === 'Active') {
				filtered = clients.filter(client => client.status === true)
			} else if (state.sort.name === 'Inactive') {
				filtered = clients.filter(client => client.status === false)
			} else if (state.sort.name === 'Will expire soon') {
				filtered = clients.filter(client => {
					const firstDay = dayjs(client.firstDay)
					const expirationDay = firstDay.add(client.subscription, 'day')
					const today = dayjs()
					const daysLeft = expirationDay.diff(today, 'day')

					return daysLeft > 0 && daysLeft <= 7
				})
			}

			return { filteredClients: filtered.length ? filtered : clients }
		}),
}))
