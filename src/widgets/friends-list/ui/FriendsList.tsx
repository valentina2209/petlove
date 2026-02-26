import { Friend } from "@/entities/friend/model/types";
import { FriendItem } from "@/entities/friend/ui/FriendItem";
import css from "./FriendsList.module.css"

interface Props {
    friends: Friend[]
    isLoading: boolean
}

export const FriendsList = ({ friends = [], isLoading = false }: Props) => {
    if (isLoading) {
        return <p className={css.message}>Loading partners...</p>;
    }

    if (friends.length === 0) {
        return <p className={css.message}>No partners found at the moment.</p>;
    }

    return (
        <div className={css.wrapper}>
            <ul className={css.grid}>
                {friends.map((friend) => (
                    <li key={friend._id} className={css.item}>
                        <FriendItem  friend={friend} /> 
                    </li>  
                ))}
            </ul>  
        </div>
      
    )
}