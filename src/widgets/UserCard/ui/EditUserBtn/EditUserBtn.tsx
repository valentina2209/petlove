import { useState } from "react";
import { EditUserModal } from "../EditUserModal/EditUserModal";
import css from "./EditUserBtn.module.css"

export const EditUserBtn = ({ initialData }: { initialData: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={css.editBtn}>
        <svg width="18" height="18" className="iconPen">
          <use href="/public/sprite.svg#pen"/>
        </svg>
      </button>

      {isOpen && (
        <EditUserModal 
          initialData={initialData} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
};