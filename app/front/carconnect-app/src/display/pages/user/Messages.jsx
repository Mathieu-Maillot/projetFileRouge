import React, { useState, useEffect } from 'react'

const Messages = ({ user, data }) => {
    const [messages, setMessages] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [conversations, setConversations] = useState([])
    const [selectedConversation, setSelectedConversation] = useState(null)

    useEffect(() => {
        if (user && data?.messages) {
            const userMessages = data.messages.filter(msg =>
                msg.senderId.$oid === user._id.$oid ||
                msg.receiverId.$oid === user._id.$oid
            )
            setMessages(userMessages)

            const conversationsMap = new Map()
            
            userMessages.forEach(msg => {
                const otherUserId = msg.senderId.$oid === user._id.$oid ? 
                    msg.receiverId.$oid : 
                    msg.senderId.$oid
                
                if (!conversationsMap.has(otherUserId)) {
                    const otherUser = data.users.find(u => u._id.$oid === otherUserId)
                    conversationsMap.set(otherUserId, {
                        otherUserId,
                        otherUser,
                        messages: [],
                        lastMessage: null
                    })
                }
                
                const conversation = conversationsMap.get(otherUserId)
                conversation.messages.push(msg)
                
                if (!conversation.lastMessage || new Date(msg.sentAt.$date) > new Date(conversation.lastMessage.sentAt.$date)) {
                    conversation.lastMessage = msg
                }
            })
            
            const conversationsArray = Array.from(conversationsMap.values())
                .sort((a, b) => 
                    new Date(b.lastMessage.sentAt.$date) - new Date(a.lastMessage.sentAt.$date)
                )
            
            setConversations(conversationsArray)
        }
    }, [user, data])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const filteredConversations = conversations.filter(conv =>
        conv.messages.some(msg => 
            msg.content.toLowerCase().includes(searchTerm.toLowerCase())
        ) || 
        (conv.otherUser && 
        `${conv.otherUser.firstName} ${conv.otherUser.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const getOtherUserName = (otherUser) => {
        return otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'Unknown User'
    }

    const getFormattedDate = (dateString) => {
        if (!dateString) return ""
        const dateObj = new Date(dateString)
        return dateObj.toLocaleString('fr-FR', { 
            day: '2-digit', 
            month: 'long', 
            hour: '2-digit',
            minute: '2-digit'
        })
    }
    
    const openConversation = (conversation) => {
        setSelectedConversation(conversation)
    }
    
    const closeConversation = () => {
        setSelectedConversation(null)
    }

    return (
        <div id="messages" className="w_100 margin_top08">
            <div className="flex column gap1">
                <h1>Mes messages</h1>
                <input
                    type="text"
                    placeholder="Rechercher des messages ou conversations..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input input_default"
                />
                <ul className="flex column gap1 pad1">
                    {filteredConversations.length > 0 ? filteredConversations.map((conv, index) => (
                        <li 
                            key={index} 
                            className="element_box flex column gap05 pointer"
                            onClick={() => openConversation(conv)}
                        >
                            <div className="element">
                                <p><strong>{getOtherUserName(conv.otherUser)}</strong></p>
                            </div>
                            <div className="element">
                                <p className='text_color02'>{conv.lastMessage.content.slice(0, 50)}
                                    {conv.lastMessage.content.length > 50 ? '...' : ''}
                                </p>
                            </div>
                            <div className="element">
                                <p>{getFormattedDate(conv.lastMessage.sentAt.$date)}</p>
                            </div>
                        </li>
                    )) : (
                        <p>Aucun message trouvé</p>
                    )}
                </ul>
            </div>
            
            {selectedConversation && (
                <div className="conversation-modal">
                    <div className="conversation-window">
                        <div className="conversation-header">
                            <h3>{getOtherUserName(selectedConversation.otherUser)}</h3>
                            <button onClick={closeConversation} className="close-button">×</button>
                        </div>
                        <div className="conversation-messages">
                            {selectedConversation.messages
                                .sort((a, b) => new Date(a.sentAt.$date) - new Date(b.sentAt.$date))
                                .map((msg, idx) => (
                                    <div key={idx} className={`message ${msg.senderId.$oid === user._id.$oid ? 'sent' : 'received'}`}>
                                        <div className="message-content"><p>{msg.content}</p></div>
                                        <div className="message-time">{getFormattedDate(msg.sentAt.$date)}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="conversation-input">
                            <input type="text" placeholder="Écrire un message..." />
                            <button>Envoyer</button>
                        </div>
                    </div>
                </div>
            )}
            

        </div>
    )
}

export default Messages