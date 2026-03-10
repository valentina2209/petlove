import { useGetCurrentUserQuery } from "@/entities/user/api/userApi"
import css from "./UserBlock.module.css"
import { EditUserBtn } from "../EditUserBtn/EditUserBtn";
import { ChangeEvent, useRef, useState } from "react";
import { useLang } from "@/app/providers/LanguageProvider/LanguageProvider";
import { translations } from "@/shared/config/i18n/translations";


export const UserBlock = () => {
    const { data: user, isLoading, error } = useGetCurrentUserQuery();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const { lang } = useLang()
    const t = translations[lang]

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
    
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);

    }
  };

    if (isLoading) return <div className={css.loader}>Loader profile...</div>
    if (error || !user) return <div className={css.error}>Failed to load user data</div>

    return (
        <div className={css.wrapperContainer}>
            <div className={css.header}>
                <div className={css.userTag}>User
                    <svg className={css.iconUser} width="18" height="18">
                        <use href="/public/sprite.svg#icon-user" />
                    </svg>
                </div>
                
                <EditUserBtn initialData={user} />   
            </div>

            <label htmlFor="avatarUpload" className={css.avatarLabel}>
                <div className={css.avatarFrame}>
                    {avatarUrl ? (
                        <img src={avatarUrl} alt="User avatar" className={css.avatarImage} />
                    ) : (
                        <div className={css.avatarWrapper}>
                            <img 
                                src={user.avatar || "/src/shared/assets/default-avatar.png"} 
                                alt={user.name} 
                                className={css.avatar} 
                            />
                        </div>                 
                    )}
                </div>
                <span className={css.uploadText}>{t.upload}</span>
            </label>

            <input
                type="file"
                id="avatarUpload" 
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp" 
                onChange={handleFileChange}
                className={css.hiddenInput} 
            />
            <div className={css.infoList}> 
                <h3 className={css.cardTitle}>{t.myInfo}</h3>
                <div className={css.list}>
                    <input 
                        type="text" 
                        value={user.name} 
                        readOnly 
                        className={css.infoInput} 
                    />
                    <input 
                        type="email" 
                        value={user.email} 
                        readOnly 
                        className={css.infoInput} 
                    />
                    <input 
                        type="tel" 
                        value={user.phone || "+380"} 
                        readOnly 
                        className={css.infoInput} 
                    /> 
                </div>
            </div>
        </div>
    )
}