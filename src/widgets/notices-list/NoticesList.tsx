import { Notice } from "@/entities/notice/model/types"
import { NoticeItem } from "@/entities/notice/ui/NoticeItem"
import css from "./NoticesList.module.css"


interface Props {
  notices: Notice[]
  isLoading: boolean
}

export const NoticesList = ({ notices, isLoading }: Props) => {

  if (isLoading) return <p className={css.statusMessage}>Loading...</p>

  if (!notices.length) return <p className={css.statusMessage}>No notices found</p>

  return (
    <ul className={css.grid}>
      {notices.map((notice) => (
        <li key={notice._id} className={css.item}>
          <NoticeItem
            notice={notice}
          />
        </li>
      ))}
    </ul>
    
  )
}