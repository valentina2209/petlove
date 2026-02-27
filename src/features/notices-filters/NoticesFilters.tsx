import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Select, { components, DropdownIndicatorProps } from 'react-select';
import { 
  useGetNoticesCategoriesQuery, 
  useGetNoticesSexQuery, 
  useGetNoticesSpeciesQuery,
  useGetCitiesQuery 
} from '@/entities/notice/api/noticesApi';
import css from './NoticesFilters.module.css';

// Компонент кастомної стрілочки, яка обертається при відкритті
const CustomDropdownIndicator = (props: DropdownIndicatorProps<any>) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg 
        className={`${css.iconChevron} ${props.selectProps.menuIsOpen ? css.rotated : ''}`} 
        width="18" 
        height="18"
      >
        <use href="/src/shared/assets/sprite.svg#chevronDown"></use>
      </svg>
    </components.DropdownIndicator>
  );
};

export const NoticesFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cityKeyword, setCityKeyword] = useState('');

  const { data: categories = [] } = useGetNoticesCategoriesQuery();
  const { data: sexList = [] } = useGetNoticesSexQuery();
  const { data: speciesList = [] } = useGetNoticesSpeciesQuery();
  const { data: cities = [] } = useGetCitiesQuery(cityKeyword, {
    skip: cityKeyword.length < 3,
  });

  const updateParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'Show all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const formatOptions = (data: string[]) => [
    { value: 'Show all', label: 'Show all' },
    ...data.map(item => ({ value: item, label: item }))
  ];

  const cityOptions = cities.map(city => ({ 
    value: city._id, 
    label: `${city.cityEn}, ${city.stateEn}` 
  }));

  return (
    <div className='container'>
      <div className={css.filtersBox}>
      <div className={css.topLine}>
        {/* Інпут пошуку з іконкою праворуч */}
        <div className={css.searchWrapper}>
          <input
            className={css.mainSearchInput}
            placeholder="Search"
            value={searchParams.get('keyword') || ''}
            onChange={(e) => updateParam('keyword', e.target.value)}
          />
          <svg className={css.searchIconInside} width="18" height="18">
            <use href="/src/shared/assets/sprite.svg#search"></use>
          </svg>
        </div>

        {/* Кастомні селекти (Category, Gender, Type) */}
        {[
          { key: 'category', placeholder: 'Category', options: formatOptions(categories) },
          { key: 'sex', placeholder: 'By gender', options: formatOptions(sexList) },
          { key: 'species', placeholder: 'By type', options: formatOptions(speciesList) }
        ].map(filter => (
          <div key={filter.key} className={css.selectWrapper}>
            <Select
              classNamePrefix="customSelect"
              placeholder={filter.placeholder}
              options={filter.options}
              value={filter.options.find(opt => opt.value === searchParams.get(filter.key)) || null}
              onChange={(opt: any) => updateParam(filter.key, opt?.value || null)}
              components={{ DropdownIndicator: CustomDropdownIndicator }}
              isSearchable={false}
            />
          </div>
        ))}

        {/* Локація */}
        <div className={css.locationWrapper}>
          <Select
            classNamePrefix="customSelect"
            placeholder="Location"
            isClearable
            options={cityOptions}
            onInputChange={(val) => setCityKeyword(val)}
            onChange={(opt: any) => updateParam('locationId', opt?.value || null)}
            components={{
              DropdownIndicator: () => (
                <svg className={css.searchIconInSelect} width="18" height="18">
                  <use href="/src/shared/assets/sprite.svg#search"></use>
                </svg>
              )
            }}
          />
        </div>
      </div>

      {/* Сортування з хрестиком */}
      <div className={css.sortLine}>
        {['popular', 'unpopular', 'cheap', 'expensive'].map(sort => {
          const isActive = searchParams.get('sort') === sort;
          return (
            <div 
              key={sort} 
              className={`${css.tag} ${isActive ? css.tagActive : ''}`} 
              onClick={() => updateParam('sort', sort)}
            >
              <span>{sort.charAt(0).toUpperCase() + sort.slice(1)}</span>
              {isActive && (
                <button 
                  className={css.tagCloseBtn} 
                  onClick={(e) => {
                    e.stopPropagation(); // ФІКС: щоб не тригерився клік по всьому тегу
                    updateParam('sort', null);
                  }}
                >
                  <svg width="14" height="14">
                    <use href="/src/shared/assets/sprite.svg#crossSmall"></use>
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};