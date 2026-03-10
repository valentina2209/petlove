import { PetsItem } from "@/entities/pet/ui/PetsItem";
import { Link } from "react-router-dom";
import css from "./PetsBlock.module.css";
import { useLang } from "@/app/providers/LanguageProvider/LanguageProvider";
import { translations } from "@/shared/config/i18n/translations";

export const PetsBlock = ({ pets }: { pets: any[] }) => {
  const { lang } = useLang()
  const t = translations[lang]

  return (
    <div className={css.wrapperCard}>
      <div className={css.header}>
        <h3 className={css.sectionTitle}>{t.myPets}</h3>
        <Link to="/add-pet" className={css.addBtn}>
          {t.addPet} <span className={css.plus}>+</span>
        </Link>
      </div>

      <div className={css.list}>
        {pets && pets.length > 0 ? (
          pets.map((pet) => <PetsItem key={pet._id} pet={pet} />)
        ) : (
            <p className={css.emptyText}>{t.emptyText}</p>
        )}
      </div>
    </div>
  );
};