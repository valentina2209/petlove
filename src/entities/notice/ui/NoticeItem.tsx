import { formatDate } from "@/shared/utils/formatDate"
import { Notice } from "../../notice/model/types"
import css from "./NoticeItem.module.css"
import { useSelector } from "react-redux"
import { RootState } from "@/app/providers/StoreProvider/store"
import { useAddFavoriteMutation, useGetCurrentUserQuery, useRemoveFavoriteMutation } from "@/entities/user/api/userApi"
import { Modal } from "@/shared/ui/modal/Modal"
import { ModalNotice } from "@/features/notice-modal/ModalNotice"
import { ModalAttention } from "@/features/notice-modal/ModalAttention"
import { useModal } from "@/shared/hooks/useModal"
import { useLang } from "@/app/providers/LanguageProvider/LanguageProvider"
import { translations } from "@/shared/config/i18n/translations"

interface Props {
  notice: Notice
  variant?: 'default' | 'favorite';
}

export const NoticeItem = ({ notice, variant = 'default' }: Props) => {
  const { isOpen, open, close } = useModal();
  const { lang } = useLang()
  const t = translations[lang]


  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { data: user } = useGetCurrentUserQuery(undefined, { skip: !isLoggedIn });

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const isFavorite = user?.noticesFavorites?.some((fav: any) => fav._id === notice._id) ?? false;

  const displayPrice = notice.price && notice.price > 0 ? `$${notice.price}` : "";
 
   const handleLearnMoreClick = () => {
    open()
   };

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); 

    if (!isLoggedIn) {
      alert("Please log in to add to favorites!");
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(notice._id).unwrap();
      } else {
        await addFavorite(notice._id).unwrap();
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  }

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
            <span className={css.metaLabel}>{t.name}</span>
            <span className={css.metaValue}>{notice.name}</span>
          </div>
          <div className={css.metaItem}>
            <span className={css.metaLabel}>{t.birthday}</span>
            <span className={css.metaValue}>{formatDate(notice.birthday)}</span>
          </div>
          <div className={css.metaItem}>
            <span className={css.metaLabel}>{t.sex}</span>
            <span className={css.metaValue}>{notice.sex}</span>
          </div>
          <div className={css.metaItem}>
            <span className={css.metaLabel}>{t.species}</span>
            <span className={css.metaValue}>{notice.species}</span>
          </div>
          <div className={css.metaItem}>
            <span className={css.metaLabel}>{t.category}</span>
            <span className={css.metaValue}>{notice.category}</span>
          </div>
        </div>

        <p className={css.comment}>{notice.comment}</p>

        <div className={css.footer}>
          <div className={css.price}>{displayPrice}</div>
          <div className={css.actions}>
            <button
              onClick={handleLearnMoreClick}
              className={css.learnMoreBtn}
            >
              {t.learnMore}
            </button>

            {isOpen && (
              <Modal onClose={close}>
                {isLoggedIn ? (
             
                  <ModalNotice id={notice._id} onClose={close} />
                ) : (
                 
                <ModalAttention onClose={close} />
                )}
              </Modal>
            )}
            <button
              onClick={handleFavoriteToggle}
              className={`${css.favoriteBtn} ${isFavorite ? css.active : ''}`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg width="30" height="30" className={css.heartIcon}>
                <use href={`/src/shared/assets/sprite.svg#${variant === 'favorite'
                    ? 'icon-trash'
                    : (isFavorite ? 'icon-heart-filled' : 'icon-heart')
                  }`}>
                </use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}