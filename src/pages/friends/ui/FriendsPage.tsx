import { useGetFriendsQuery } from "@/entities/friend/api/friendsApi";
import { Title } from "@/shared/ui/title/Title";
import { FriendsList } from "@/widgets/friends-list/ui/FriendsList";
import { translations } from "@/shared/config/i18n/translations";
import { useLang } from "@/app/providers/LanguageProvider/LanguageProvider";
import css from "./FriendsPage.module.css";

export const FriendsPage = () => {
    const { data: friends = [], isLoading } = useGetFriendsQuery();
    const { lang } = useLang()
    const t = translations[lang]

    return (
        <section className="container">
            <div className={css.wrapper}>
                <Title className={css.title} size="xl">{t.friendTitle}</Title>
                <FriendsList friends={friends} isLoading={isLoading} />  
            </div>
        </section>
    )
    
}