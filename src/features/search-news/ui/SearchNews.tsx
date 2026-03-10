import { useState } from 'react'
import css from './SearchNews.module.css'

interface Props {
  onSearch: (value: string) => void
}

export const SearchNews = ({ onSearch }: Props) => {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <div className={css.inputWrapper}>
        <input
          className={css.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
        />

        <div className={css.actions}>
          {value && (
            <button
              type="button"
              className={css.clearButton}
              onClick={() => {
                setValue('');
                onSearch('');
              }}
            >
              ✕
            </button>
          )}
          <button type='submit' className={css.submitButton}>
            <svg className={css.searchIcon}>
              <use href="/sprite.svg#search"></use>
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}