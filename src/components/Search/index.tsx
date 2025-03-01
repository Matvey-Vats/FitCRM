import { ChangeEvent, FC, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import styles from './Search.module.scss'

const Search: FC = () => {
	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const handleClearInput = () => {
		setValue('')

		inputRef.current?.focus()
	}

	const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}
	return (
		<div className={styles.block}>
			<div className={styles.search}>
				<BiSearch color='#09122c' className={styles.searchIcon} />
				<input
					ref={inputRef}
					value={value}
					onChange={handleChangeSearchValue}
					type='text'
					placeholder='Search...'
					className={styles.searchField}
				/>
				{value && (
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
