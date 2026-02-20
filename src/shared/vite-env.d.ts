declare module '*.png';
declare module '*.webp';
declare module '*.svg';
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}