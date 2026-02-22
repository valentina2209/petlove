import MainMob from '@/shared/assets/images/mobile/MainMob.png';
import MainMob2x from "@/shared/assets/images/mobile/MainMob2x.png"
import MainTab from '@/shared/assets/images/tablet/MainTab.png';
import MainTab2x from "@/shared/assets/images/tablet/MainTab2x.png"
import MainDes from '@/shared/assets/images/desktop/MainDes.png';
import MainDes2x from "@/shared/assets/images/desktop/MainDes2x.png";
import logo from "@/shared/assets/images/desktop/logo.png"
import logoMob from "@/shared/assets/images/mobile/logoMob.png"
import logoSvg from "@/shared/assets/images/desktop/logoDesSvg.svg";
import logoMobSvg from "@/shared/assets/images/mobile/logoMobSvg.svg";

export const IMAGES = {
  welcomeScreen: {
    mobile: { src: MainMob, src2x: MainMob2x },
    tablet: { src: MainTab, src2x: MainTab2x  },
    desktop: { src: MainDes, src2x: MainDes2x },
    alt: "Welcome background"
  },
  logoWhite: {
    mobile: { src: logoMob },
    desktop: { src: logo},
    alt: "PetLove Logo"
  },
  logo: {
    desktop: { src: logoSvg },
    mobile: { src: logoMobSvg },
    alt: "PetLove Logo White"
  }

};