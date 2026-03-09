import { PetsItem } from "@/entities/pet/ui/PetsItem";
import { Link } from "react-router-dom";
import css from "./PetsBlock.module.css";

export const PetsBlock = ({ pets }: { pets: any[] }) => {
  return (
    <div className={css.wrapperCard}>
      <div className={css.header}>
        <h3 className={css.sectionTitle}>My pets</h3>
        <Link to="/add-pet" className={css.addBtn}>
          Add pet <span className={css.plus}>+</span>
        </Link>
      </div>

      <div className={css.list}>
        {pets && pets.length > 0 ? (
          pets.map((pet) => <PetsItem key={pet._id} pet={pet} />)
        ) : (
          <p className={css.emptyText}>You haven't added any pets yet.</p>
        )}
      </div>
    </div>
  );
};