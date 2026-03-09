import { useGetFriendsQuery } from "@/entities/friend/api/friendsApi";
import { Title } from "@/shared/ui/title/Title";
import { FriendsList } from "@/widgets/friends-list/ui/FriendsList";
import css from "./FriendsPage.module.css";

export const FriendsPage = () => {
    const { data: friends = [], isLoading } = useGetFriendsQuery();

    return (
        <section className="container">
            <div className={css.wrapper}>
                <Title className={css.title} size="xl">Our friends</Title>
                <FriendsList friends={friends} isLoading={isLoading} />  
            </div>
        </section>
    )
    
}