import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateUserMutation } from "@/entities/user/api/userApi";
import { editSchema } from "../../model/editSchema";
import css from "./EditUserModal.module.css";
import { useRef } from "react";
import { useLang } from "@/app/providers/LanguageProvider/LanguageProvider";
import { translations } from "@/shared/config/i18n/translations";

interface EditUserModalProps {
  initialData: {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  onClose: () => void;
}

export const EditUserModal = ({ initialData, onClose }: EditUserModalProps) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { lang } = useLang()
  const t = translations[lang]

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
      phone: initialData.phone || "+380",
      avatar: initialData.avatar || "",
    },
  });

  const avatarValue = watch("avatar");

  const getAvatarPreview = () => {
    if (!avatarValue) return "/src/shared/assets/default-avatar.png";
    if (typeof avatarValue === "string" && avatarValue.startsWith("http")) return avatarValue;
    if (avatarValue instanceof File) return URL.createObjectURL(avatarValue);
    return "/src/shared/assets/default-avatar.png";
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
    
      setValue("avatar", file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: any) => {
  try {

    const body = {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      
      avatar: typeof data.avatar === 'string' && data.avatar.trim() !== "" 
        ? data.avatar 
        : initialData.avatar 
    };

    console.log("Відправляємо на сервер:", body);

    await updateUser(body).unwrap();
    onClose();
  } catch (error) {
    console.error("Update failed:", error);
  }
};

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg width="24" height="24"><use href="/sprite.svg#icon-close" /></svg> 
        </button>
        
        <h2 className={css.title}>{t.edit}</h2>

        <div className={css.avatarPreview}>
           <img src={getAvatarPreview()} alt="User" />
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.avatarRow}>
            <input
              {...register("avatar")}
              placeholder="Avatar URL"
              className={css.urlInput}
            />

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
              accept="image/*"
            />

            <button type="button" className={css.uploadBtn} onClick={handleUploadClick}>
               {t.upload}
               <svg className={css.icon} width="18" height="18"><use href="/sprite.svg#icon-upload-cloud" /></svg>
             </button>
          </div>
          {errors.avatar && <p className={css.error}>{errors.avatar.message}</p>}
          
          <div className={css.inputGroup}>
            <input {...register("name")} placeholder="Name" />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          <div className={css.inputGroup}>
            <input {...register("email")} placeholder="Email" />
            {errors.email && <p className={css.error}>{errors.email.message}</p>}
          </div>

          <div className={css.inputGroup}>
            <input {...register("phone")} placeholder="Phone" />
            {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
          </div>

          <button type="submit" className={css.saveBtn} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};