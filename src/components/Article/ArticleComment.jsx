import {
    likeArticleComment,
    dislikeArticleComment
} from "../../services/article.service"
import formatDate from "../../utilities/formatDate"
import likeImage from "../../img/like.png"
import dislikeImage from "../../img/dislike.png"
import styles from "./Article.module.css"
import SERVER_PATH from "../../constants/SERVER_PATH"

const ArticleComment = (props) => {
    const {
        id,
        sender,
        text,
        likes,
        created_at
    } = props

    const onLike = () => likeArticleComment(id)
    const onDislike = () => dislikeArticleComment(id)

    return (
        <div className={styles.comment}>
            <div className={styles.commentUser}>
                <img
                    className={styles.commentUserAvatar}
                    src={SERVER_PATH + sender.avatar}
                    alt="user avatar"
                />
                <div className={styles.commentUserInfo}>
                    <div className={styles.commentUserName}>{sender.name} {sender.lastname}</div>
                    <div className={styles.commentUserDate}>{formatDate(created_at)}</div>
                </div>
            </div>
            <div className={styles.commentContent}>
                {text}
            </div>
            <div className={styles.commentLikes}>
                <button
                    className={styles.commentThumb}
                    onClick={onLike}
                >
                    <img src={likeImage} alt="like" />
                </button>
                <button
                    className={styles.commentThumb}
                    onClick={onDislike}
                >
                    <img src={dislikeImage} alt="dislike" />
                </button>
                <span className={styles.commentCount}>{likes}</span>
            </div>
        </div>
    )
}

export default ArticleComment
