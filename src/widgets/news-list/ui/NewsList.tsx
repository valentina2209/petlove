import type { News } from '@/entities/news/model/types'
import { NewsItem } from '@/entities/news/ui/NewsItem'
import css from "./NewsList.module.css"

interface Props {
  news: News[]
  isLoading?: boolean
}

export const NewsList = ({ news = [], isLoading = false }: Props) => {
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!news.length) {
    return <p>No news found</p>
  }

  return (
    <div>
      <div className={css.grid}>
        {news.map((item) => (
          <NewsItem key={item._id} news={item} />
        ))}
      </div>
    </div>
  )
}





 

  