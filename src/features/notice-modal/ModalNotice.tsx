import { useGetNoticeByIdQuery } from '@/entities/notice/api/noticesApi';
import css from './ModalNotice.module.css';
import { formatDate } from '@/shared/utils/formatDate';
import { useAddFavoriteMutation, useGetCurrentUserQuery, useRemoveFavoriteMutation } from '@/entities/user/api/userApi';

interface Props {
  id: string
  onClose: () => void
}

export const ModalNotice = ({ id, onClose }: Props) => {
  const { data: notice, isLoading } = useGetNoticeByIdQuery(id);
  const { data: user } = useGetCurrentUserQuery(undefined);
  
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const isFavorite = user?.noticesFavorites?.some((fav: any) => fav._id === id) ?? false;

  if (isLoading) return <div className={css.loader}>Loading...</div>;
  if (!notice) return null;

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(id).unwrap();
      } else {
        await addFavorite(id).unwrap();
      }
    } catch (err) {
      console.error("Favorite toggle error:", err);
    }
  }

  const displayPrice = notice.price && notice.price > 0
   ? `$${notice.price}`
   : "";
  
  
  return (
    <div className={css.wrapper}>
        <div className={css.imageBox}>
          <img src={notice.imgURL} alt={notice.title} />
          <span className={css.categoryBadge}>{notice.category}</span>
        </div>
        
        <h3 className={css.title}>{notice.title}</h3>
        
      <div className={css.rating}>
        <svg width="16" height="16" className={css.starIcon}><use href="/src/shared/assets/sprite.svg#star"></use></svg>
        <svg width="16" height="16" className={css.starIconGray}><use href="/src/shared/assets/sprite.svg#star"></use></svg>
        <svg width="16" height="16" className={css.starIconGray}><use href="/src/shared/assets/sprite.svg#star"></use></svg>
        <svg width="16" height="16" className={css.starIconGray}><use href="/src/shared/assets/sprite.svg#star"></use></svg>
        <svg width="16" height="16" className={css.starIconGray}><use href="/src/shared/assets/sprite.svg#star"></use></svg>
        <span className={css.ratingValue}>{notice.popularity}</span>
      </div>  
      
      <div className={css.metaGrid}>
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
      </div>
         
      <p className={css.comment}>{notice.comment}</p>

      <div className={css.price}>{displayPrice}</div>
      
      <div className={css.footerActions}>
        <button 
          className={`${css.favBtn} ${isFavorite ? css.active : ''}`} 
          onClick={handleToggleFavorite}
        >
          {isFavorite ? 'Remove from' : 'Add to'} 
          {!isFavorite && (
            <svg width="18" height="18" className={css.heartIcon}>
              <use href="/src/shared/assets/sprite.svg#heart-outline"></use>
            </svg>
          )}
        </button>
        <a href={`tel:${notice.user?.phone || ''}`} className={css.contactBtn}>Contact</a> 
      </div>
    </div>
  );
};