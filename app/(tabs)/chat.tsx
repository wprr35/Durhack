import { StyleSheet, Text, View } from 'react-native';
import {useRouter} from 'expo-router';
import useSession from '../(auth)/checkSession';
import { useEffect, useState } from 'react';
import useUsername from "../../components/helpers/useUsername";

//talkjs
//"tL5MdE12"
import { getTalkSession } from '@talkjs/core';
import * as TalkRn from '@talkjs/expo';


export default function Chat() {
  const router = useRouter();
  const session = useSession();
  const userId = session?.user.id ?? '';
  const username = useUsername(userId);
  

  useEffect(() => {
    if (session === null) return; // still loading
    if (!session) router.replace('/sign-in'); // redirect if not logged in
  }, [session]);

  // // Show Loading only while session is null
  // if (session === null) return <Text>Requires sign in</Text>;

  //   const [me, setMe] = useState(userId);
  //   const [conversationId, setConversationId] = useState('Test-group chat');

  if(!session){
    return(
      <View style={{flex:1}}>
      <Text>{'Not logged in'}</Text>
    </View>
    )
  }

  return (
    <View style={{flex:1}}>
      <ChatComponent userId={userId} username={username}/>
      <Text>{session ? `Logged in as ${session.user.email}: userId ${session.user.id}` : 'Not logged in'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});


function ChatComponent(props) {
  const [conversationId, setConversationId] = useState('Mega-Group-Chat');
  const me = {
    id: props?.userId,
    name: props?.username,
    welcomeMessage: 'Hey there! How are you? :-)',
  };

  if(me.id==undefined){
    return null;
  }  

    const session = getTalkSession({
    // @ts-ignore
    // host: 'durhack.talkjs.com',
    appId:"tL5MdE12",
    userId:me.id,
  });


    const conversationBuilder = TalkRn.getConversationBuilder(conversationId);
    conversationBuilder.setParticipant(me);
  return (
    <>
      <TalkRn.Session appId="tL5MdE12" me={me}>
        <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
      </TalkRn.Session>
    </>
  );
}

