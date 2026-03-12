import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAddUserPetMutation } from '@/entities/user/api/userApi';
import { addPetSchema } from '../model/schema';
import sprite from '/sprite.svg'; 
import css from './AddPetForm.module.css';

import { useGetNoticesSpeciesQuery } from '@/entities/notice/api/noticesApi';
import { useState } from 'react';
import { useLang } from '@/app/providers/LanguageProvider/LanguageProvider';
import { translations } from '@/shared/config/i18n/translations';



export const AddPetForm = () => {
  const navigate = useNavigate();
  const [addPet, { isLoading }] = useAddUserPetMutation();

  const { lang } = useLang()
  const t = translations[lang]

  const [isOpen, setIsOpen] = useState(false);

  const { data: speciesList = [] } = useGetNoticesSpeciesQuery()
  
  const { register, setValue, watch, handleSubmit, formState: { errors },  } = useForm({
    resolver: yupResolver(addPetSchema),
    defaultValues: {
      sex: undefined,
      imgURL: '',
      species: ''
    }
  });

  const imgUrlValue = watch('imgURL');
  
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const objectUrl = URL.createObjectURL(file);
    setValue("imgURL", objectUrl, { shouldValidate: true });
  }
};

  const onSubmit = async (data: any) => {
    try {
      await addPet(data).unwrap();
      navigate('/profile'); 
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };
  
  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>{t.addMyPet} / <span className={css.subtitle}>{t.personalDetails}</span></h2>
      
      <div className={css.headerActions}>
        {/* Радіо-кнопки статі з іконками зі спрайту */}
        <div className={css.sexGroup}>
          {['female', 'male', 'multiple'].map((val) => (
            <label key={val} className={css.sexLabel}>
              <input type="radio" {...register('sex')} value={val} className={css.radio} />
              <span className={`${css.customRadio} ${css[val]}`}>
                <svg className={css.sexIcon}>
                  <use href={`${sprite}#icon-${val}`} />
                </svg>
              </span>
            </label>
          ))}
        </div>

        <div className={css.photoUploadSection}>
          <div className={css.petPreview}>
            {imgUrlValue ? (
              <img src={imgUrlValue} alt="Pet preview" className={css.previewImage} />
            ) : (
              <svg className={css.pawIcon}><use href={`${sprite}#icon-paw`} /></svg>
            )}
          </div>
          <div className={css.inputGroup}>
            <input
              {...register("imgURL")}
              placeholder="Enter URL"
              className={css.urlInput}
            />
            <label className={css.uploadButton}>
              {t.upload}
              <svg width="18" height="18"><use href={`${sprite}#icon-upload-cloud`} /></svg>
              <input type="file" accept='image/*' onChange={handleFileUpload} hidden />
            </label>
          </div>
        </div>
        
        <div className={css.inpWrapper}>
          <input {...register('title')} placeholder="Title" className={css.input} />
          <input {...register('name')} placeholder="Pet's Name" className={css.input} />
        </div>
       
        <div className={css.row}>
          <div className={css.fieldWrapper}>
            <input
              type="text"
              {...register('birthday')}
              value={watch("birthday") ? watch("birthday").split('-').reverse().join('.') : ""}
              placeholder="00.00.0000"
              className={css.input}
              readOnly
            />
            <div className={css.calendarIconWrapper}> 
              <svg className={css.iconCalendar} width="18" height="18">
                <use href={`${sprite}#icon-calendar`} />
              </svg>

              <input
                type="date"
                className={css.hiddenDateInput}
                onChange={(e) => {
                  setValue("birthday", e.target.value, { shouldValidate: true })
                }}
              />
            </div>
          </div>
          
          <div className={css.fieldWrapper}>
            <div
              className={css.customSelect} 
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={css.textInput}>{watch("species") || "Type of pet"}</span>
              <svg className={`${css.chevron} ${isOpen ? css.rotate : ''}`} width="18" height="18">
                <use href={`${sprite}#icon-chevron-down`} />
              </svg>
            </div>  

            {isOpen && (
              <ul className={css.optionsList}>
                {speciesList.map((item) => (
                  <li 
                    className={css.list}
                    key={item} 
                    onClick={() => {
                      setValue("species", item);
                      setIsOpen(false);
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </li>
                ))}
              </ul>
            )} 
          </div>
        </div>
      </div>

      <div className={css.actions}>
        <button type="button" onClick={() => navigate('/profile')} className={css.backBtn}>{t.back}</button>
        <button type="submit" disabled={isLoading} className={css.submitBtn}>{t.submit}</button>
      </div>
    </form>
  );
};