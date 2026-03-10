import { useState } from "react";
import { SearchField } from "@/shared/ui/SearchField/SearchField";
import { SelectField } from "@/shared/ui/SelectField/SelectField";
import {
  useGetNoticesCategoriesQuery,
  useGetNoticesSexQuery,
  useGetNoticesSpeciesQuery,
  useGetCitiesQuery,
} from "@/entities/notice/api/noticesApi";
import { useNoticesFilters } from "../model/useNoticesFilters";
import { formatOptions } from "@/shared/lib/select";
import css from "./NoticesFilters.module.css";
import { useLang } from "@/app/providers/LanguageProvider/LanguageProvider";
import { translations } from "@/shared/config/i18n/translations";

export const NoticesFilters = () => {
  const { params, updateParam, resetFilters } = useNoticesFilters();

  const [cityKeyword, setCityKeyword] = useState("");

  const { lang } = useLang()
  const t = translations[lang]

  const { data: categories = [] } = useGetNoticesCategoriesQuery();
  const { data: sex = [] } = useGetNoticesSexQuery();
  const { data: species = [] } = useGetNoticesSpeciesQuery();

  const { data: cities = [] } = useGetCitiesQuery(cityKeyword, {
    skip: cityKeyword.length < 3,
  });

  const categoryOptions = formatOptions(categories);
  const sexOptions = formatOptions(sex);
  const speciesOptions = formatOptions(species);

  const cityOptions =
    cities?.map((city) => ({
      value: city._id,
      label: `${city.cityEn}, ${city.stateEn}`,
    })) || [];


  const getValue = (options: any[], param: string | null) =>
    options.find((o) => o.value === param) || null;

  return (
    <div className={css.wrapper}>
      <div className={css.row}>
        {/* Search */}
          <SearchField
            value={params.get("keyword") || ""}
            placeholder="Search"
            onChange={(value) => updateParam("keyword", value)}
          />

        {/* Category */}
        <SelectField
          placeholder="Category"
          className={`${css.halfWidth} ${css.categoryField}`}
          options={categoryOptions}
          value={getValue(categoryOptions, params.get("category"))}
          onChange={(value) => updateParam("category", value)}
        />

        {/* Gender */}
        <SelectField
          placeholder="By gender"
          className={`${css.halfWidth} ${css.categoryField}`}
          options={sexOptions}
          value={getValue(sexOptions, params.get("sex"))}
          onChange={(value) => updateParam("sex", value)}
        />
    
        {/* Species */}
        <SelectField
        placeholder="By type"
        className={`${css.fullWidth} ${css.typeField}`}
          options={speciesOptions}
          value={getValue(speciesOptions, params.get("species"))}
          onChange={(value) => updateParam("species", value)}
        />

        {/* Location */}
        <SelectField
        placeholder="Location"
        className={css.fullWidth}
          options={cityOptions}
          value={getValue(cityOptions, params.get("locationId"))}
          isSearchable
          onInputChange={(value) => setCityKeyword(value)}
          onChange={(value) => updateParam("locationId", value)}
        />  
      </div>
      
      {/* Sorting */}
      <div className={css.sort}>
        {["Popular", "Unpopular", "Cheap", "Expensive"].map((sort) => (
          <button
            key={sort}
            onClick={() => updateParam("sort", sort)}
            className={
              params.get("sort") === sort ? css.activeSort : css.sortBtn
            }
          >
            {sort}
          </button>
        ))}

        <button className={css.reset} onClick={resetFilters}>
          {t.reset}
        </button>
      </div>  
    

    </div>

   
  );
};