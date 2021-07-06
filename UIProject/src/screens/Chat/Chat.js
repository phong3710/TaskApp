import React, { useCallback, useEffect, useState } from 'react'
import { YellowBox } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firebase-firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GiftedChat } from 'react-native-gifted-chat'

const firebaseConfig = {
        apiKey: "AIzaSyCBxu51IXQy9WgiyCrpG-6cPMVS04ilohE",
        authDomain: "uiproject-6237c.firebaseapp.com",
        projectId: "uiproject-6237c",
        storageBucket: "uiproject-6237c.appspot.com",
        messagingSenderId: "135404742752",
        appId: "1:135404742752:web:439a86fb2e9db96504fb05"
}
if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])
firebase.default.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.default.firestore()
const chatRef = db.collection('chats')

const Chat = () => {
    const [user, setuser] = useState(null)
    const [message, setmessage] = useState([])
    
    useEffect(() => {
        readUser()
        
        const unsubcribe = chatRef.onSnapshot(querySnapshot => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    return {...message, createdAt: message.createdAt.toDate()}
                }).sort(( a, b ) => b.createdAt.getTime() - a.createdAt.getTime())
                firebase.firestore.setLogLevel('debug')
                console.log(db)
            appendMessage(messagesFirestore)
        })
        return () => unsubcribe()
    }, [])

    const appendMessage = useCallback((message) => {
        setmessage((previousMessage) => GiftedChat.append(previousMessage, message))
    }, [message])

    async function readUser() {
        const userName = await AsyncStorage.getItem('@userName')
        const _id = await AsyncStorage.getItem('@uId')
        const avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxf7EpLw4SUEqRsZYkp_GjHL7ChuGR9CNKQ&usqp=CAU'
        const user = {userName, _id, avatar}
        if(user) {
            setuser(user)
        }
    }

    async function handleSend (messages) {
        const writes = messages.map( m => chatRef.add(m))
        await Promise.all(writes)
    }

    return ( 
            <GiftedChat
            isTyping={true} 
            showAvatarForEveryMessage={true}
            showUserAvatar={true}
            messages={message} 
            user={user} 
            onSend={handleSend} /> 
    )
}
export default Chat