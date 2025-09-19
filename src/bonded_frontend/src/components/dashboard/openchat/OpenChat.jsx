import React, { useState } from 'react'
import styles from './scss/_openchat.module.scss'
import { ChatList } from './ChatList'
import ChatMessage from './ChatMessage'

const OpenChat = () => {
  const [selectedChatId, setSelectedChatId] = useState(null)

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId)
  }

  const handleBackToList = () => {
    setSelectedChatId(null)
  }

  return (
    <div className={styles.openChat}>
      {selectedChatId ? (
        <ChatMessage
          chatId={selectedChatId}
          onBack={handleBackToList}
        />
      ) : (
        <ChatList onChatSelect={handleChatSelect} />
      )}
    </div>
  )
}

export default OpenChat 