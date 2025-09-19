import rimuro from '@/assets/example/rimuro.jpg'
import nishimiya from '@/assets/example/nishimiya.jpg'

export const mockChatData = [
    {
        image: rimuro,
        alt: 'George Alan',
        title: 'George Alan',
        subtitle: 'Lorem ipsum dolor sit amet consect...',
        date: new Date(),
        unread: 4,
        id: 'george-alan',
        status: 'online'
    },
    {
        image: rimuro,
        alt: 'Uber Cars',
        title: 'Uber Cars',
        subtitle: 'Form',
        date: new Date(),
        unread: 1,
        id: 'uber-cars',
        status: null
    },
    {
        image: rimuro,
        alt: 'Robert Allen',
        title: 'Robert Allen',
        subtitle: 'You unblocked this user',
        date: new Date(),
        unread: 0,
        id: 'robert-allen',
        status: 'online'
    },
    {
        image: rimuro,
        alt: 'Scott Franklin',
        title: 'Scott Franklin',
        subtitle: 'Audio',
        date: new Date(Date.now() - 86400000),
        unread: 0,
        id: 'scott-franklin',
        status: null
    },
    {
        image: rimuro,
        alt: 'Muhammed',
        title: 'Muhammed',
        subtitle: 'Poll',
        date: new Date(Date.now() - 86400000),
        unread: 0,
        id: 'muhammed',
        status: null
    }
]

// ANCHOR: Mock message data for chat conversations
export const mockMessages = {
    'george-alan': [
        {
            id: 'msg-1',
            text: 'Sure! Sending them over now.',
            sender: 'george-alan',
            timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
            type: 'received'
        },
        {
            id: 'msg-2',
            text: 'Thanks! Looks good.',
            sender: 'me',
            timestamp: new Date(Date.now() - 1000 * 60 * 4),
            type: 'sent',
            status: 'read'
        },
        {
            id: 'msg-3',
            text: 'Absolutely. Just send your address, and I\'ll ship it out.',
            sender: 'george-alan',
            timestamp: new Date(Date.now() - 1000 * 60 * 4),
            type: 'received'
        },
        {
            id: 'msg-4',
            text: 'I\'ll take it. Can you ship it?',
            sender: 'me',
            timestamp: new Date(Date.now() - 1000 * 60 * 4),
            type: 'sent',
            status: 'read'
        },
        {
            id: 'msg-5',
            text: 'Thank you!',
            sender: 'george-alan',
            timestamp: new Date(Date.now() - 1000 * 60 * 4),
            type: 'received'
        },
        {
            id: 'msg-6',
            text: 'Great, I\'ll send it now. Thanks!',
            sender: 'me',
            timestamp: new Date(Date.now() - 1000 * 60 * 4),
            type: 'sent',
            status: 'read'
        }
    ],
    'uber-cars': [
        {
            id: 'msg-1',
            text: 'Your ride is arriving in 3 minutes.',
            sender: 'uber-cars',
            timestamp: new Date(Date.now() - 1000 * 60 * 10),
            type: 'received'
        },
        {
            id: 'msg-2',
            text: 'Thanks for the update!',
            sender: 'me',
            timestamp: new Date(Date.now() - 1000 * 60 * 9),
            type: 'sent',
            status: 'read'
        }
    ],
    'robert-allen': [
        {
            id: 'msg-1',
            text: 'You unblocked this user',
            sender: 'system',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            type: 'system'
        }
    ]
}

// ANCHOR: Mock chat participants data
export const mockChatParticipants = {
    'george-alan': {
        id: 'george-alan',
        name: 'George Alan',
        image: rimuro,
        status: 'online',
        typing: true
    },
    'uber-cars': {
        id: 'uber-cars',
        name: 'Uber Cars',
        image: rimuro,
        status: null,
        typing: false
    },
    'robert-allen': {
        id: 'robert-allen',
        name: 'Robert Allen',
        image: rimuro,
        status: 'online',
        typing: false
    }
}

export default {
    mockChatData,
    mockMessages,
    mockChatParticipants
}