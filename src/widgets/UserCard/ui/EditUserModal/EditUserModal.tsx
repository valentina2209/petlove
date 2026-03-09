import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateUserMutation } from "@/entities/user/api/userApi";
import { editSchema } from "../../model/editSchema";
import css from "./EditUserModal.module.css";
import { useRef } from "react";

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

  // ВИПРАВЛЕННЯ ПОМИЛКИ 66: Безпечне отримання URL для прев'ю
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
      // Записуємо сам файл у форму для відправки на сервер
      setValue("avatar", file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: any) => {
  try {
    // Створюємо чистий об'єкт для відправки
    const body = {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      // ПЕРЕВІРКА: якщо в avatar лежить File, ми не можемо його відправити як JSON.
      // Відправляємо або нове посилання, або старе, або дефолтне.
      avatar: typeof data.avatar === 'string' && data.avatar.trim() !== "" 
        ? data.avatar 
        : initialData.avatar // Повертаємо старий аватар, щоб не було помилки "empty"
    };

    console.log("Відправляємо на сервер:", body);

    await updateUser(body).unwrap();
    onClose();
  } catch (error) {
    // Тут ми побачимо помилку 400, якщо щось не так
    console.error("Update failed:", error);
  }
};

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg width="24" height="24"><use href="/src/shared/assets/sprite.svg#icon-close" /></svg> 
        </button>
        
        <h2 className={css.title}>Edit information</h2>

        <div className={css.avatarPreview}>
           <img src={getAvatarPreview()} alt="User" />
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          {/* Поле для завантаження/посилання на аватар */}
          <div className={css.avatarRow}>
            <input
              {...register("avatar")}
              placeholder="Avatar URL"
              className={css.urlInput}
            />

            {/* Прихований інпут для файлів */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
              accept="image/*"
            />

            <button type="button" className={css.uploadBtn} onClick={handleUploadClick}>
               Upload photo
               <svg className={css.icon} width="18" height="18"><use href="/src/shared/assets/sprite.svg#icon-upload-cloud" /></svg>
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