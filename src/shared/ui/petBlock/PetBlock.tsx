import css from "./PetBlock.module.css"

interface PetBlockProps {
  images: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  avatar?: string
  petName?: string
  birthday?: string
  description?: string
  className? : string
}

export const PetBlock = ({
  images,
  avatar,
  petName,
  birthday,
  description,
  className,
}: PetBlockProps) => {
  return (
    <div className={`${css.wrapper} ${className}`}>
      <div className={css.imageContainer}>
       <picture className={css.picture}>
        {/* Десктоп: від 1280px */}
        <source media="(min-width: 1280px)" srcSet={images.desktop} />
        {/* Планшет: від 768px */}
        <source media="(min-width: 768px)" srcSet={images.tablet} />
        {/* Мобілка: за замовчуванням (320px - 767px) */}
        <img src={images.mobile} alt={petName} className={css.mainImage} />
      </picture>
       
        {avatar && petName && (
          <div className={css.badge}>
            <div className={css.badgeHeader}>
              <div className={css.avatarWrapper}>
                <img src={avatar} alt={petName} className={css.avatar} />
              </div>

              <div className={css.infoRow}>
                <div className={css.wrapperText}>
                  <span className={css.petName}>{petName}</span>
                  <span className={css.birthdayLabel}>
                    Birthday: <span className={css.birthdayValue}>{birthday}</span>
                  </span>
                </div>
                <p className={css.badgeText}>{description}</p>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  )
}