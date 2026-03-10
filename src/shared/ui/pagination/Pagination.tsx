import css from "./Pagination.module.css"

interface Props {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onChange,
}: Props) => {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages = []
    const start = Math.max(1, currentPage - 1)
    const end = Math.min(totalPages, start + 2)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className={css.pagination}>
      <div className={css.arrows}>
        <button
          className={css.arrow}
          disabled={currentPage === 1}
          onClick={() => onChange(1)}
        >
          <svg className={css.arrowIconRight}>
            <use href="/public/sprite.svg#slider2l"></use>
          </svg>
        </button>
        <button
          className={css.arrow}
          disabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}
        >
          <svg className={css.arrowIconRight}>
            <use href="/public/sprite.svg#slider1l"></use>
          </svg>
        </button>
      </div>

      <div className={css.pages}>
        {getPages().map((page) => (
          <button
            key={page}
            className={`${css.pageButton} ${currentPage === page ? css.active : ''}`}
            onClick={() => onChange(page)}
          >
            {page}
          </button>
        ))}
        {totalPages > 3 && currentPage < totalPages - 1 && (
          <span className={css.dots}>...</span>
        )}
      </div>
      
      <div className={css.arrows}>
        <button
          className={css.arrow}
          disabled={currentPage === totalPages}
          onClick={() => onChange(currentPage + 1)}
        >
          <svg className={css.arrowIcon}>
            <use href="/sprite.svg#slider1l"></use>
          </svg>
        </button>
        <button
          className={css.arrow}
          disabled={currentPage === totalPages}
          onClick={() => onChange(totalPages)}
        >
          <svg className={css.arrowIcon}>
            <use href="/sprite.svg#slider2l"></use>
          </svg> 
        </button>
      </div>
    </div>
  )
}