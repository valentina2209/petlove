import { IMAGES } from "@/shared/config/images";
import { AppPicture } from "@/shared/ui/AppPicture";
import { useLang } from "@/app/providers/LanguageProvider/LanguageProvider";
import { translations } from "@/shared/config/i18n/translations";
import css from "./HomePage.module.css";

function HomePage() {
  const { lang } = useLang()
  const t = translations[lang]
  return (
      <div className="container">
        <section className={css.heroTextSection}>
          <div className={css.content}>
            <h1 className={css.title}>
              {t.heroTitle}<span>{t.defText}</span> {t.endText}
            </h1>
            <p className={css.description}>
             {t.subTitle}
            </p>
          </div>
        </section>
        <section className={css.heroImageSection}>
          <div className={css.imageWrapper}>
            <AppPicture {...IMAGES.home} className={css.mainImages} />
          </div>
        </section>
      </div>
    
  );
}

export default HomePage;
