import MainMob from '@/shared/assets/images/mobile/MainMob.png';
import MainMob2x from "@/shared/assets/images/mobile/MainMob2x.png"
import MainTab from '@/shared/assets/images/tablet/MainTab.png';
import MainTab2x from "@/shared/assets/images/tablet/MainTab2x.png"
import MainDes from '@/shared/assets/images/desktop/MainDes.png';
import MainDes2x from "@/shared/assets/images/desktop/MainDes2x.png";
import logo from "@/shared/assets/images/desktop/logoBlackDes.png"
import logoMob from "@/shared/assets/images/mobile/logoBlackMob.png"
import logoSvg from "@/shared/assets/images/desktop/logo.png";
import logoMobSvg from "@/shared/assets/images/mobile/logoMob.png";
import homeImgDes from "@/shared/assets/images/desktop/HomeDes.png";
import homeImgTab from "@/shared/assets/images/tablet/HomeTab.png";
import homeImgMob from "@/shared/assets/images/mobile/HomeMob.png";
import logoHomeMob from "@/shared/assets/images/mobile/logoWMob.png";
import logoHomeDes from "@/shared/assets/images/desktop/logoWDes.png"

export const IMAGES = {
  home: {
    mobile: { src: homeImgMob},
    tablet: { src: homeImgTab},
    desktop: { src: homeImgDes},
    alt: "Welcome"
  },
  welcomeScreen: {
    mobile: { src: MainMob, src2x: MainMob2x },
    tablet: { src: MainTab, src2x: MainTab2x  },
    desktop: { src: MainDes, src2x: MainDes2x },
    alt: "Welcome background"
  },
  logoWhite: {
    mobile: { src:logoMobSvg },
    desktop: { src:logoSvg },
    alt: "PetLove Logo"
  },
  logo: {
    desktop: { src:  logo },
    mobile: { src: logoMob },
    alt: "PetLove Logo White"
  },
  logoHome: {
    mobile: { src:logoHomeMob},
    desktop: { src:logoHomeDes },
    alt: "PetLove Logo"
  }

};