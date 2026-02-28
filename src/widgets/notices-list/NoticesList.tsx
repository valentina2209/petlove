import { Notice } from "@/entities/notice/model/types"
import { NoticeItem } from "@/entities/notice/ui/NoticeItem"
import css from "./NoticesList.module.css"
import { useModal } from "@/shared/hooks/useModal"
import { useState } from "react"
import { Modal } from "@/shared/ui/modal/Modal"
import { ModalNotice } from "@/features/notice-modal/ModalNotice"
import { ModalAttention } from "@/features/notice-modal/ModalAttention"

interface Props {
  notices: Notice[]
  isLoading: boolean
}

export const NoticesList = ({ notices, isLoading }: Props) => {
  const { isOpen, open, close } = useModal()
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const isLoggedIn = false;

  const handleLearnMore = (notice: Notice) => {
    if (!isLoggedIn) {
      setSelectedNotice(null)
      open()
      return
    }

    setSelectedNotice(notice)
    open()
  }

  if (isLoading) return <p className={css.statusMessage}>Loading...</p>

  if (!notices.length) return <p className={css.statusMessage}>No notices found</p>

  return (
    <div className="container">
      <ul className={css.grid}>
        {notices.map((notice) => (
          <li key={notice._id} className={css.item}>
            <NoticeItem
              notice={notice}
              onLearnMore={() => handleLearnMore(notice)}
            />
          </li>
        ))}
      </ul>


      {isOpen && (
        <Modal onClose={close}>
          {isLoggedIn && selectedNotice ? (
            <ModalNotice
              notice={selectedNotice}
              isFavorite={false}
              onToggleFavorite={() => console.log("API call")}
            />
          ) : (
              <ModalAttention />
          )}
        </Modal>
      )}
    </div>
  )
}