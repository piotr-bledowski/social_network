import json
from channels.generic.websocket import WebsocketConsumer
#from asgiref.sync import async_to_sync

# the following configuration works both for DMs and group chats
# DM is simply a 2-user group
class ChatConsumer(WebsocketConsumer):
    async def connect(self):
        self.chat_name = self.scope['url_route']['kwargs']['chat_name']
        self.group_name = 'chat_' + self.chat_name

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
    
    # receive message from websocket
    async def receive(self, text):
        text_json = json.loads(text)
        message = text_json['message']
        username = text_json['username']

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username
            },
        )
    
    # receive message from group chat
    async def chat_message(self, event):
        message = event['message']
        username = event['username']

        await self.send(
            text = json.dumps(
                {
                    'message': message
                    'username': username
                }
            )
        )
        
    pass