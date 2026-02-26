import { useState } from 'react'
import { useGetNewsQuery } from '@/entities/news/api/newsApi'
import { SearchNews } from '@/features/search-news/ui/SearchNews'
import { Pagination } from '@/features/pagination/ui/Pagination'
import { NewsList } from '@/widgets/news-list/ui/NewsList'
import { Title } from '@/shared/ui/title/Title'
import css from "./NewsPage.module.css"

export const NewsPage = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  
  const { data, isLoading, isError } = useGetNewsQuery(
    { page, search },
    { refetchOnMountOrArgChange: true }
  )

  const handleSearch = (value: string) => {
    setPage(1) 
    setSearch(value)
  }

  if (isError) {
    return <p>Something went wrong</p>
  }
  
  return (
    <div className='container'>
      <div className={css.page}>
        <div className={css.header}>
          <Title size='xl'>News</Title>
          <div className={css.searchWrapper}>
            <SearchNews onSearch={handleSearch} />
          </div>
        </div>
      
        <NewsList news={data?.results ?? []} isLoading={isLoading} />
          
        {!isLoading && data && data.totalPages > 1 && (
          <Pagination
            currentPage={data.page}
            totalPages={data.totalPages}
            onChange={setPage}
          />
        )}
      </div>
    </div>
  )
}