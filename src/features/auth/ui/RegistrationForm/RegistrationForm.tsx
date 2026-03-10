import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registrationSchema } from "../../model/registrationSchema"
import { useRegisterMutation } from "@/entities/user/api/userApi"
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

  const [registerUser, {isLoading}] = useRegisterMutation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registrationSchema),
    mode: "onBlur",
    reValidateMode: "onBlur"
  })

  const emailClass = `${css.input} ${
    errors.email ? css.inputError : 
    watch("email")?.length > 0 ? css.inputSuccess : ""
  }`;

  const passwordValue = watch("password") || "";
  
  const isSuccess = passwordValue.length > 0 && !errors.password

 
  const onSubmit = async (data: FormValues) => {
    const { confirmPassword, ...registerData } = data;

    try {
      await registerUser(registerData).unwrap()
      
      navigate("/profile")
    } catch (error: any) {
      if (error.status === 409) {
      alert("This email is already taken. Try another one.");
    } else {
      console.error("Registration failed:", error);
    }
    }
  }

  const getInputClass = (fieldName: keyof FormValues) => {
     if (errors[fieldName]) return css.errorInput;
    return "";
   }

  return (
    <div className={css.containerForm}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={css.title}>Registration</h1>
        <p className={css.subtitle}>Thank you for your interest in our platform.</p>

        <div className={css.inputWrapper}>
          <input
            placeholder="Name"
            {...register("name")}
            className={getInputClass("name")}
          />
          {errors.name && (
            <svg className={css.statusIconError}>
              <use href="/public/sprite.svg#crossSmall"></use>
            </svg>
          )}   
        </div>
        {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
      
        <div className={css.inputWrapper}>
          <input
            placeholder="Email"
            autoComplete="one-time-code"
            {...register("email")}
            className={emailClass}
          />
          {errors.email && (
            <svg className={css.statusIconError}><use href="/public/sprite.svg#crossSmall"></use></svg>
          )}
        </div>
        {errors.email && <p className={css.errorText}>{errors.email.message}</p>}

        <div className={css.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
           autoComplete="new-password"
            {...register("password")}
            className={`${css.input} ${errors.password ? css.inputError : isSuccess ? css.inputSuccess : ""}`}
          />
           <div className={css.controls}>
            {isSuccess && (
              <svg className={css.statusIconSuccess}>
                <use href="/public/sprite.svg#check"></use>
              </svg>
            )}
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={css.eyeBtn}>
              <svg className={css.eyeIcon}><use href={`/public/sprite.svg#eye${showPassword ? '' : 'Off'}`}></use></svg>
            </button>
          </div>
        </div>
        {errors.password && (
          <p className={css.errorText}>{errors.password.message}</p>
        )}
        {isSuccess && (
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
             <svg className={css.eyeIcon}><use href={`/public/sprite.svg#eye${showConfirmPassword ? '' : 'Off'}`}></use></svg>
            </button>
          </div>
          
        </div>
        {errors.confirmPassword && <p className={css.errorText}>{errors.confirmPassword.message}</p>}

        <button type="submit" className={css.button} disabled={isLoading}>
          {isLoading ? "Registering..." : "Registration"}
        </button>

        <p className={css.loginLink}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  )
}