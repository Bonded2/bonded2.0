import React, { useState, useRef } from 'react'
import styles from './scss/_chatmessage.module.scss'
import { Plus, Mic, FileText, Send } from 'lucide-react'

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('')
    const inputRef = useRef(null)

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message.trim())
            setMessage('')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className={styles.messageInput}>
            <button className={styles.attachButton}>
                <Plus size={20} />
            </button>

            <div className={styles.inputContainer}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="First line"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.textInput}
                />

                <div className={styles.inputActions}>
                    <button className={styles.inputAction}>
                        <Mic size={16} />
                    </button>
                    <button className={styles.inputAction}>
                        <FileText size={16} />
                    </button>
                </div>
            </div>

            <button
                className={styles.sendButton}
                onClick={handleSend}
                disabled={!message.trim()}
            >
                <Send size={20} />
            </button>
        </div>
    )
}

export default MessageInput