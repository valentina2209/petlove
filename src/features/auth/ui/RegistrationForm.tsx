import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registrationSchema } from "../model/validation"
import { useRegisterMutation } from "../api/authApi"
import { useNavigate } from "react-router-dom"
import css from "./RegistrationForm.module.css"
import { useState } from "react"

interface FormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigate = useNavigate()
  const [registerUser] = useRegisterMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registrationSchema),
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const { confirmPassword, ...payload } = data
      await registerUser(payload).unwrap()

      navigate("/profile")
    } catch (error: any) {
      alert(error?.data?.message || "Registration error")
    }
  }

  const getInputClass = (fieldName: keyof FormValues) => {
    if (errors[fieldName]) return css.errorInput;
    return "";
  }

  return (
    <div className={css.containerForm}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.title}>Registration</h2>
        <p className={css.subtitle}>Thank you for your interest in our platform.</p>

        <div className={css.inputWrapper}>
          <input
            placeholder="Name"
            {...register("name")}
            className={getInputClass("name")}
          />
          {errors.name && (
            <svg className={css.statusIconError}>
              <use href="/src/shared/assets/sprite.svg#crossSmall"></use>
            </svg>
          )}   
        </div>
        {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
      
        <div className={css.inputWrapper}>
          <input
            placeholder="Email"
            {...register("email")}
            className={getInputClass("email")}
          />
          {errors.email && (
            <svg className={css.statusIconError}><use href="/src/shared/assets/sprite.svg#crossSmall"></use></svg>
          )}
        </div>
        {errors.email && <p className={css.errorText}>{errors.email.message}</p>}

        <div className={css.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className={errors.password ? css.errorInput : css.successInput}
          />
           <div className={css.controls}>
            {!errors.password && <svg className={css.statusIconSuccess}><use href="/src/shared/assets/sprite.svg#check"></use></svg>}
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={css.eyeBtn}>
              <svg className={css.eyeIcon}><use href={`/src/shared/assets/sprite.svg#eye${showPassword ? '' : 'Off'}`}></use></svg>
            </button>
          </div>
        </div>
        {errors.password ? (
          <p className={css.error}>{errors.password.message}</p>
        ) : (
          <p className={css.successText}>Password is secure</p>
        )}

        <div className={css.inputWrapper}>
          <input
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Confirm password"
            {...register("confirmPassword")}
            className={getInputClass("confirmPassword")}
          />
          <div className={css.controls}>
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={css.eyeBtn}>
             <svg className={css.eyeIcon}><use href={`/src/shared/assets/sprite.svg#eye${showConfirmPassword ? '' : 'Off'}`}></use></svg>
            </button>
          </div>
          
        </div>
        {errors.confirmPassword && <p className={css.errorText}>{errors.confirmPassword.message}</p>}

        <button type="submit" className={css.button}>
          Registration
        </button>

        <p className={css.loginLink}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  )
}