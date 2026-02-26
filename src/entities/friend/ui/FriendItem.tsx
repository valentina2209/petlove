import { Friend } from '../model/types'
import css from './FriendItem.module.css'

interface Props {
    friend: Friend
}

export const FriendItem = ({ friend }: Props) => {
  const openDay = friend.workDays?.find(day => day.isOpen)

  const workingHours = openDay 
    ? `${openDay.from} - ${openDay.to}`
    : 'Day and night';

  return (
    <div className={css.card}>
      <span className={css.workTime}>{workingHours}</span>

      <div className={css.contentWrapper}>
        <img
          src={friend.imageUrl}
          alt={friend.title}
          className={css.logo}
        />
      </div>
       
      <ul className={css.contacts}>
        <h3 className={css.title} title={friend.title}>{friend.title}</h3>
        <li className={css.contactItem}>
          <span className={css.label}>Email: </span>
          <a
            href={`mailto:${friend.email}`}
            className={css.link}
          >
            {friend.email || "website only"}
          </a>
        </li>
        <li className={css.contactItem}>
          <span className={css.label}>Address: </span>
          <a
            href={friend.addressUrl}
            target="_blank"
            rel="noreferrer"
            className={css.link}
          >
            {friend.address || "website only"}
          </a>
        </li>
        <li className={css.contactItem}>
          <span className={css.label}>Phone: </span>
          <a
            href={`tel:${friend.phone}`}
            className={css.link}
          >
            {friend.phone || "email only"}
          </a> 
        </li>
      </ul>  
    </div>
  )
}