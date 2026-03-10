import { useState } from 'react'
import { useGetNewsQuery } from '@/entities/news/api/newsApi'
import { SearchNews } from '@/features/search-news/ui/SearchNews'
import { Pagination } from '@/shared/ui/pagination/Pagination'
import { NewsList } from '@/widgets/news-list/ui/NewsList'
import { Title } from '@/shared/ui/title/Title'
import css from "./NewsPage.module.css"
import { useLang } from '@/app/providers/LanguageProvider/LanguageProvider'
import { translations } from '@/shared/config/i18n/translations'

export const NewsPage = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
   const { lang } = useLang()
    const t = translations[lang]
  
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
          <Title className={css.title} size='xl'>{t.newTitle}</Title>
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