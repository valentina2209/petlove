import { useState } from "react";
import { Notice } from "@/entities/notice/model/types";
import { NoticeItem } from "@/entities/notice/ui/NoticeItem"; 
import css from "./MyNotices.module.css";
;

interface MyNoticesProps {
  favorites: Notice[];
  viewed: Notice[]; 
}

export const MyNotices = ({ favorites = [], viewed = [] }: MyNoticesProps) => {
  const [activeTab, setActiveTab] = useState<"favorites" | "viewed">("favorites");
  const currentItems = activeTab === "favorites" ? favorites : viewed;
  
  return (
    <div className={css.wrapperContainer}>
      {/* Навігація табами */}
      <div className={css.tabs}>
        <button
          className={`${css.tabBtn} ${activeTab === "favorites" ? css.active : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          My favorite pets
        </button>
        <button
          className={`${css.tabBtn} ${activeTab === "viewed" ? css.active : ""}`}
          onClick={() => setActiveTab("viewed")}
        >
          Viewed
        </button>
      </div>
        
      {currentItems.length > 0 ? (
        <ul className={css.list}>
          {currentItems.map((notice) => (
            <li key={notice._id}>
              <NoticeItem
                notice={notice}
                variant={activeTab === "favorites" ? "favorite" : "default"}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className={css.emptyState}>
          <p className={css.emptyText}>Oops, <span className={css.emptySpan}>looks like there aren't any furries</span> on our adorable page yet. Do not worry! View your pets on the "find your favorite pet" page and add them to your favorites.</p>
        </div>
      )}
    </div>
  );
};
