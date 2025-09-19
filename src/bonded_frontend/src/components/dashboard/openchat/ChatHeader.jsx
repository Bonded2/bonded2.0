import React from 'react'
import styles from './scss/_chatmessage.module.scss'
import { ArrowLeft, Video, Phone, Info } from 'lucide-react'

const ChatHeader = ({ participant, onBack }) => {
    return (
        <div className={styles.chatHeader}>
            <button className={styles.backButton} onClick={onBack}>
                <ArrowLeft size={20} />
            </button>

            <div className={styles.participantInfo}>
                <div className={styles.avatarContainer}>
                    <img
                        src={participant.image}
                        alt={participant.name}
                        className={styles.avatar}
                    />
                    {participant.status && (
                        <div className={`${styles.statusIndicator} ${styles[participant.status]}`} />
                    )}
                </div>

                <div className={styles.participantDetails}>
                    <h2 className={styles.participantName}>{participant.name}</h2>
                    {participant.typing ? (
                        <p className={styles.typingStatus}>Typing...</p>
                    ) : (
                        <p className={styles.onlineStatus}>
                            {participant.status === 'online' ? 'Online' : 'Offline'}
                        </p>
                    )}
                </div>
            </div>

            <div className={styles.headerActions}>
                <button className={styles.actionButton}>
                    <Video size={20} />
                </button>
                <button className={styles.actionButton}>
                    <Phone size={20} />
                </button>
                <button className={styles.actionButton}>
                    <Info size={20} />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader