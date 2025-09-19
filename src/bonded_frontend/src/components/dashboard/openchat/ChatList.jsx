import React, { useState } from 'react'
import { ChatList as ReactChatList } from 'react-chat-elements'
import styles from './scss/_chatlist.module.scss'
import { Plus, Search } from 'lucide-react'
import { mockChatData } from './MockData'
import ChatItem from './ChatItem'


export const ChatList = ({ onChatSelect }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredChats, setFilteredChats] = useState(mockChatData)

    // ANCHOR: Handle search functionality
    const handleSearch = (e) => {
        const searchValue = e.target.value
        setSearchTerm(searchValue)

        if (searchValue.trim() === '') {
            setFilteredChats(mockChatData)
        } else {
            const filtered = mockChatData.filter(chat =>
                chat.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                chat.subtitle.toLowerCase().includes(searchValue.toLowerCase())
            )
            setFilteredChats(filtered)
        }
    }

    // ANCHOR: Handle chat item click
    const handleChatClick = (chatItem) => {
        console.log('Chat clicked:', chatItem)
        if (onChatSelect) {
            onChatSelect(chatItem.id)
        }
    }

    // ANCHOR: Handle new chat button click
    const handleNewChat = () => {
        console.log('New chat clicked')
        // TODO: Implement new chat creation
    }

    return (
        <div className={styles.chatListContainer}>
            {/* ANCHOR: Header with title and new chat button */}
            <div className={styles.chatListHeader}>
                <h2 className={styles.chatListTitle}>Recent chats</h2>
                <button
                    className={styles.newChatButton}
                    onClick={handleNewChat}
                    aria-label="Start new chat"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* ANCHOR: Search bar */}
            <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} size={16} />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </div>

            {/* ANCHOR: Chat list */}
            <div className={styles.chatListWrapper}>
                {filteredChats.map((chat) => (
                    <ChatItem
                        key={chat.id}
                        chat={chat}
                        onClick={() => handleChatClick(chat)}
                    />
                ))}
            </div>
        </div>
    )
}
