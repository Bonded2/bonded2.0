import React, { useState, useRef, useEffect } from 'react'
import styles from './scss/_chatmessage.module.scss'
import MessageBubble from './MessageBubble'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import { mockMessages, mockChatParticipants } from './MockData'


const ChatMessage = ({ chatId = 'george-alan', onBack }) => {
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef(null)
    const participant = mockChatParticipants[chatId]

    useEffect(() => {
        // ANCHOR: Load messages for the current chat
        const chatMessages = mockMessages[chatId] || []
        setMessages(chatMessages)
    }, [chatId])

    useEffect(() => {
        // ANCHOR: Auto-scroll to bottom when new messages arrive
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSendMessage = (text) => {
        const newMessage = {
            id: `msg-${Date.now()}`,
            text,
            sender: 'me',
            timestamp: new Date(),
            type: 'sent',
            status: 'read'
        }
        setMessages(prev => [...prev, newMessage])
    }

    if (!participant) {
        return (
            <div className={styles.chatContainer}>
                <div className={styles.errorMessage}>
                    <p>Chat not found</p>
                    <button onClick={onBack} className={styles.backToChats}>
                        Back to Chats
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.chatContainer}>
            <ChatHeader participant={participant} onBack={onBack} />

            <div className={styles.messagesContainer}>
                <div className={styles.messagesList}>
                    {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    )
}

export default ChatMessage