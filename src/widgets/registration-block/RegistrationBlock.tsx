import { PetBlock } from "@/shared/ui/petBlock/PetBlock"
import { RegistrationForm } from "@/features/auth/ui/RegistrationForm/RegistrationForm"
import catImgDesktop from "@/shared/assets/images/desktop/ResDes.png"
import catImgTablet from "@/shared/assets/images/tablet/RegTab.png"
import catImgMobile from "@/shared/assets/images/mobile/RegMob.png"
import catAvatar from "@/shared/assets/images/desktop/cat-avatar.png"
import css from "./RegistrationBlock.module.css"

export const RegistrationBlock = () => {
  const catImages = {
    desktop: catImgDesktop,
    tablet: catImgTablet,
    mobile: catImgMobile
  }
  return (
    <div className={css.wrapper}>
        <PetBlock
        images={catImages}
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