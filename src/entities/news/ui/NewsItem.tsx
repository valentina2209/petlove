import { useLang } from '@/app/providers/LanguageProvider/LanguageProvider';
import type { News } from '../model/types'
import css from "./NewsItem.module.css"
import { translations } from '@/shared/config/i18n/translations';

interface Props {
  news: News
}

export const NewsItem = ({ news }: Props) => {
  const formattedDate = new Date(news.date).toLocaleDateString("uk-UA");
  const { lang } = useLang()
  const t = translations[lang]

  return (
    <article>
      <div className={css.card}>
        <div className={css.imageWrapper}>
        <img
          src={news.imgUrl}
          alt={news.title}
          className={css.image}
        />
      </div>
    
        <div className={css.content}>
          <h3 className={css.title}>{news.title}</h3>
          <p className={css.text}>{news.text}</p>
          
          <div className={css.footer}>
            <span className={css.date}>{formattedDate}</span>

            <a 
              href={news.url}
              target='_blank'
              rel='noopener noreferrer'
              className={css.link}
            >
              {t.readMore}
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}