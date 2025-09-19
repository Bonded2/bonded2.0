import React from 'react'
import styles from './scss/_openchat.module.scss'

// ANCHOR: Individual chat item component
const ChatItem = ({ chat, onClick }) => {
    const formatTime = (date) => {
        const now = new Date()
        const diffInHours = (now - date) / (1000 * 60 * 60)

        if (diffInHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } else if (diffInHours < 48) {
            return 'Yesterday'
        } else {
            return date.toLocaleDateString()
        }
    }

    return (
        <div className={styles.chatItem} onClick={onClick}>
            <div className={styles.avatarContainer}>
                <img
                    src={chat.image}
                    alt={chat.alt}
                    className={styles.avatar}
                />
                {chat.status && (
                    <div className={`${styles.statusIndicator} ${styles[chat.status]}`} />
                )}
            </div>

            <div className={styles.chatContent}>
                <div className={styles.chatHeader}>
                    <h3 className={styles.chatTitle}>{chat.title}</h3>
                    <span className={styles.chatTime}>{formatTime(chat.date)}</span>
                </div>

                <div className={styles.chatFooter}>
                    <p className={styles.chatSubtitle}>{chat.subtitle}</p>
                    {chat.unread > 0 && (
                        <div className={styles.unreadBadge}>
                            {chat.unread}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatItem
