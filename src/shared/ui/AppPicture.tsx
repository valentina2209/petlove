import { FC } from 'react';

interface ImageSource {
  src: string;
  src2x?: string;
}

interface AppPictureProps {
  mobile: ImageSource;
  tablet?: ImageSource;
  desktop: ImageSource; 
  alt: string;
  className?: string;
}

export const AppPicture: FC<AppPictureProps> = ({ mobile, tablet, desktop, alt, className }) => {
  return (
    <picture className={className}>
      <source
        media="(min-width: 1280px)"
        srcSet={`${desktop.src} 1x, ${desktop.src2x || desktop.src} 2x`}
      />
      {tablet && (
        <source
          media="(min-width: 768px)"
          srcSet={`${tablet.src} 1x, ${tablet.src2x || tablet.src} 2x`}
        />
      )} 
      <img
        src={mobile.src}
        srcSet={`${mobile.src} 1x, ${mobile.src2x || mobile.src} 2x`}
        alt={alt}
        loading="eager" 
      />
    </picture>
  );
};