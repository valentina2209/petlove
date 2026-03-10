import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { loginSchema } from "../../model/loginSchema";
import css from "./LoginForm.module.css";
import { Title } from "@/shared/ui/title/Title";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/entities/user/api/userApi";
import { setCredentials } from "@/entities/user/model/authSlice";
import { useLang } from "@/app/providers/LanguageProvider/LanguageProvider";
import { translations } from "@/shared/config/i18n/translations";


export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lang } = useLang()
  const t = translations[lang]
  

  const [login, { isLoading }] = useLoginMutation();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const emailClass = `${css.input} ${
    errors.email ? css.inputError : 
    watch("email")?.length > 0 ? css.inputSuccess : ""
  }`;

  const passwordValue = watch("password") || "";
  
  const isSuccess = passwordValue.length > 0  && !errors.password

  const onSubmit = async (data: any) => {
    try {
      const result = await login(data).unwrap();
      localStorage.setItem('token', result.token);
      dispatch(setCredentials({ token: result.token }));
      navigate("/profile");
    } catch (error) {
      console.error("Failed to login:", error)
    }
  }
  
  return (
    <div className={css.containerForm}>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <Title className={css.title}>{t.logIn}</Title>      
        <p className={css.subtitle}>{t.welcome}</p>

        <div className={css.inputWrapper}>
          <input
            {...register("email")}
            placeholder="Email"
            autoComplete="email"
            className={emailClass}
          />
          {errors.email && (
            <svg className={css.statusIconError}><use href="/sprite.svg#icon-close"></use></svg>
          )}
        </div>
        {errors.email && <p className={css.errorText}>{errors.email.message}</p>}

        <div className={css.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            autoComplete="new-password"
            placeholder="Password"
            className={`${css.input} ${errors.password ? css.inputError : isSuccess ? css.inputSuccess : ""}`}
          />
          <div className={css.controls}>
            {isSuccess && (
              <svg className={css.statusIconSuccess}>
                <use href="/public/sprite.svg#check"></use>
              </svg>
            )}
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={css.eyeBtn}>
              <svg className={css.eyeIcon}><use href={`/sprite.svg#eye${showPassword ? "" : "Off"}`}></use></svg>
            </button>
          </div>
        </div>
        {!errors.password && <p className={css.successText}>Password is secure</p>}

        <button type="submit" className={css.button} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
       </button>
        
        <p className={css.redirectText}>
          {t.donHave} <NavLink to="/register" className={css.link}>{t.register}</NavLink>
        </p>
      </form>
    </div>
  );
};