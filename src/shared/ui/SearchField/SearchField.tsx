import css from "./SearchField.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SearchField = ({ value, onChange, placeholder }: Props) => {
  return (
    <div className={css.wrapper}>
      <input
        className={css.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      <svg width="18" height="18" className={css.icon}>
        <use href="/src/shared/assets/sprite.svg#search" />
      </svg>
    </div>
  );
};