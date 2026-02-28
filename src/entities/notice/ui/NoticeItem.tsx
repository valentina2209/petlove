import { formatDate } from "@/shared/utils/formatDate"
import { Notice } from "../../notice/model/types"
import css from "./NoticeItem.module.css"

interface Props {
  notice: Notice
  onLearnMore: () => void
}

export const NoticeItem = ({ notice, onLearnMore }: Props) => {
  const displayPrice = notice.price && notice.price > 0
    ? `$${notice.price}`
    : "";
  const isFavorite = false;
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img src={notice.imgURL} alt={notice.title} className={css.image} />
      </div>
      

      <div className={css.content}>
        <div className={css.titleRow}>
          <h3 className={css.title}>{notice.title}</h3>

          <div className={css.rating}>
            <svg width="16" height="16" className={css.starIcon}>
              <use href="/src/shared/assets/sprite.svg#star"></use>
            </svg>
            <span>{notice.popularity}</span>
          </div>
        </div>
        
        <div className={css.meta}>
          <div className={css.metaItem}>
            <span className={css.metaLabel}>Name</span>
            <span className={css.metaValue}>{notice.name}</span>
          </div>
          <div className={css.metaItem}>
            <span className={css.metaLabel}>Birthday</span>
            <span className={css.metaValue}>{formatDate(notice.birthday)}</span>
          </div>
          <div className={css.metaItem}>
            <span className={css.metaLabel}>Sex</span>
            <span className={css.metaValue}>{notice.sex}</span>
          </div>
          <div className={css.metaItem}>
            <span className={css.metaLabel}>Species</span>
            <span className={css.metaValue}>{notice.species}</span>
          </div>
          <div className={css.metaItem}>
            <span className={css.metaLabel}>Category</span>
            <span className={css.metaValue}>{notice.category}</span>
          </div>
        </div>

        <p className={css.comment}>{notice.comment}</p>

        <div className={css.footer}>
          <div className={css.price}>{displayPrice}</div>
          <div className={css.actions}>
            <button onClick={onLearnMore} className={css.learnMoreBtn}>
              Learn more
            </button>
            <button className={`${css.favoriteBtn} ${isFavorite ? css.active : ''}`}>
              <svg width="18" height="18" className={css.heartIcon}>
                <use href="/src/shared/assets/sprite.svg#icon-heart"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}