import { ChangeEvent, FC, useRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import { useSearchStore } from '../../store/store'
import styles from './Search.module.scss'

const Search: FC = () => {
	const { searchValue, setSearchValue } = useSearchStore()
	const inputRef = useRef<HTMLInputElement>(null)

	const handleClearInput = () => {
		setSearchValue('')

		inputRef.current?.focus()
	}

	const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}
	return (
		<div className={styles.block}>
			<div className={styles.search}>
				<BiSearch color='#09122c' className={styles.searchIcon} />
				<input
					ref={inputRef}
					value={searchValue}
					onChange={handleChangeSearchValue}
					type='text'
					placeholder='Search...'
					className={styles.searchField}
				/>
				{searchValue && (
					<IoClose
						style={{ cursor: 'pointer' }}
						onClick={handleClearInput}
						color='#09122c'
						size={25}
						className={styles.closeIcon}
					/>
				)}
			</div>
		</div>
	)
}

export default Search
