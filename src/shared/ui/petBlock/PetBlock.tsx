import css from "./PetBlock.module.css"

interface PetBlockProps {
  image: string
  avatar: string
  petName: string
  birthday: string
  description: string
}

export const PetBlock = ({
  image,
  avatar,
  petName,
  birthday,
  description,
}: PetBlockProps) => {
  return (
    <div className={css.wrapper}>
      <div className={css.imageContainer}>
        <img src={image} alt={petName} className={css.image} />
       
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
      </div>
    </div>
  )
}