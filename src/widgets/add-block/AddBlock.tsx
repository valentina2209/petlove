import { PetBlock } from "@/shared/ui/petBlock"
import dogImgDesktop from "@/shared/assets/images/desktop/AddDes.png"
import dogImgTablet from "@/shared/assets/images/tablet/AddTab.png"
import dogImgMobile from "@/shared/assets/images/mobile/AddMob.png"
import css from "./AddBlock.module.css"
import { AddPetForm } from "@/features/add-pet-form"

export const AddBlock = () => {
    const dogImages = {
    desktop: dogImgDesktop,
    tablet: dogImgTablet,
    mobile: dogImgMobile
  }
    return (
        <div className="container">
            <div className={css.wrapper}>
                <PetBlock 
                    className={css.imageWrapper}
                    images={dogImages}
                />
                <AddPetForm />
            </div> 
        </div>
        
    )
}