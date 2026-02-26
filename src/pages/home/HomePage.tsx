import { IMAGES } from "@/shared/config/images";
import { AppPicture } from "@/shared/ui/AppPicture";
import css from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={css.pageWrapper}>
      <div className="container">

        <section className={css.heroTextSection}>
          <div className={css.content}>
            <h1 className={css.title}>
              Take good <span>care</span> of your small pets
            </h1>
            <p className={css.description}>
              Choosing a pet for your home is a choice that is meant to enrich your
              life with immeasurable joy and tenderness.
            </p>
          </div>
        </section>
        <section className={css.heroImageSection}>
          <div className={css.imageWrapper}>
            <AppPicture {...IMAGES.home} className={css.mainImages} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
