import clsx from 'clsx'
import styles from './Title.module.css'

interface Props {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  size?: 'xl' | 'lg' | 'md' | 'sm'
  variant?: 'primary' | 'secondary' | 'accent'
  align?: 'left' | 'center'
  className?: string
}

export const Title = ({
  children,
  as: Tag = 'h1',
  size = 'lg',
  variant = 'primary',
  align = 'left',
  className,
}: Props) => {
  return (
    <Tag
      className={clsx(
        styles.title,
        styles[size],
        styles[variant],
        styles[align],
        className
      )}
    >
      {children}
    </Tag>
  )
}