import { PetBlock } from "@/shared/ui/petBlock/PetBlock"
import { RegistrationForm } from "@/features/auth/ui/RegistrationForm"
import catImg from "@/shared/assets/images/desktop/ResDes.png"
import catAvatar from "@/shared/assets/images/desktop/cat-avatar.png"
import css from "./RegistrationBlock.module.css"

export const RegistrationBlock = () => {
  return (
    <div className={css.wrapper}>
        <PetBlock
        image={catImg}
        avatar={catAvatar}
            petName="Jack"
            birthday="18.10.2021"
            description="Jack is a gray Persian cat with green eyes. 
                         He loves to be pampered and groomed, and enjoys playing with toys."
        />
        <RegistrationForm />
    </div>
  )
}