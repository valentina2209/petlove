import { useEffect, useState } from "react";
import css from "./SearchField.module.css";

type Props = {
  value: string;
  onSubmit: (value: string) => void;
  placeholder?: string;
};

export const SearchField = ({ value, onSubmit, placeholder }: Props) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(localValue);
  };

  const handleClear = () => {
    setLocalValue("");
    onSubmit(""); 
  };

  return (
    <form className={css.wrapper} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        value={localValue}
        placeholder={placeholder}
        onChange={(e) => setLocalValue(e.target.value)}
      />

      <div className={css.controls}>
        {/* Хрестик: з'являється тільки якщо в полі щось є */}
        {localValue && (
          <button type="button" onClick={handleClear} className={css.clearBtn}>
            <svg width="18" height="18">
              <use href="/sprite.svg#icon-close" />
            </svg>
          </button>
        )}

        {/* Лупа: кнопка submit */}
        <button type="submit" className={css.searchBtn}>
          <svg width="18" height="18">
            <use href="/sprite.svg#search" />
          </svg>
        </button>
      </div>
    </form>
  );
};