import { useRemovePetMutation } from "@/entities/user/api/userApi";
import css from "./PetsItem.module.css";
import { Pet } from "../model/types";
import { formatDate } from "@/shared/utils/formatDate";
import { useLang } from "@/app/providers/LanguageProvider/LanguageProvider";
import { translations } from "@/shared/config/i18n/translations";

interface Props {
    pet: Pet
}

export const PetsItem = ({pet}: Props) => {
  const [removePet, { isLoading }] = useRemovePetMutation();
  const { lang } = useLang()
  const t = translations[lang]

  const handleDelete = async () => {
    try {
      await removePet(pet._id).unwrap();
    } catch (error) {
      console.error("Failed to delete pet:", error);
    }
  };

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img src={pet.imgURL} alt={pet.title} className={css.image} />
      </div>
      
      <div className={css.content}>
        <div className={css.header}>
          <h4 className={css.title}>{pet.title}</h4>
          <button 
            className={css.deleteBtn} 
            onClick={handleDelete}
            disabled={isLoading}
          >
            <svg width="18" height="18" className={css.icon}>
              <use href="/sprite.svg#wastebasket" />
            </svg>
          </button>
        </div>

        <div className={css.infoGrid}>
          <div className={css.infoItem}>
            <span className={css.label}>{t.name}</span>
            <span className={css.value}>{pet.name}</span>
          </div>
          <div className={css.infoItem}>
            <span className={css.label}>{t.birthday}</span>
            <span className={css.value}>{formatDate(pet.birthday)}</span>
          </div>
          <div className={css.infoItem}>
            <span className={css.label}>{t.sex}</span>
            <span className={css.value}>{pet.sex}</span>
          </div>
          <div className={css.infoItem}>
            <span className={css.label}>{t.species}</span>
            <span className={css.value}>{pet.species}</span>
          </div>
        </div>
      </div>
    </div>
  );
};