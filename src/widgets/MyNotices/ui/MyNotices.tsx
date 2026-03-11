import { useState } from "react";
import { Notice } from "@/entities/notice/model/types";
import { NoticeItem } from "@/entities/notice/ui/NoticeItem"; 
import css from "./MyNotices.module.css";
import { useLang } from "@/app/providers/LanguageProvider/LanguageProvider";
import { translations } from "@/shared/config/i18n/translations";
;

interface MyNoticesProps {
  favorites: Notice[];
  viewed: Notice[]; 
}

export const MyNotices = ({ favorites = [], viewed = [] }: MyNoticesProps) => {
  const [activeTab, setActiveTab] = useState<"favorites" | "viewed">("favorites");
  const currentItems = activeTab === "favorites" ? favorites : viewed;
  
  const { lang } = useLang()
  const t = translations[lang]
  
  return (
    <div className={css.wrapperContainer}>
      {/* Навігація табами */}
      <div className={css.tabs}>
        <button
          className={`${css.tabBtn} ${activeTab === "favorites" ? css.active : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          {t.myFavorite}
        </button>
        <button
          className={`${css.tabBtn} ${activeTab === "viewed" ? css.active : ""}`}
          onClick={() => setActiveTab("viewed")}
        >
          {t.viewed}
        </button>
      </div>
        
      {currentItems.length > 0 ? (
        <ul className={css.petsList}>
          {currentItems.map((notice) => (
            <li
              key={notice._id}
              className={css.petItem}
            >
              <NoticeItem
                notice={notice}
                variant={activeTab === "favorites" ? "favorite" : "default"}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className={css.emptyState}>
            <p className={css.emptyText}>{t.ops} <span className={css.emptySpan}>{t.empty}</span>{t.emo}</p>
        </div>
      )}
    </div>
  );
};
