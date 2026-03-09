import { PetBlock } from "@/shared/ui/petBlock/PetBlock"
import { LoginForm } from "@/features/auth/ui/LoginForm/LoginForm"
import dogImgDesktop from "@/shared/assets/images/desktop/LogDes.png"
import dogImgTablet from "@/shared/assets/images/tablet/LogTab.png"
import dogImgMobile from "@/shared/assets/images/mobile/LogMob.png"
import dogAvatar from "@/shared/assets/dog-avatar.png"
import css from "./LoginBlock.module.css"

export const LoginBlock = () => {
  const dogImages = {
    desktop: dogImgDesktop,
    tablet: dogImgTablet,
    mobile: dogImgMobile
  }
  return (
    <div className={css.wrapper}>
        <PetBlock
        images={dogImages}
        avatar={dogAvatar}
            petName="Rich"
            birthday="21.09.2020"
            description="Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!"
        />
        <LoginForm />
    </div>
  )
}