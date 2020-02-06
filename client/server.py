from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import *


def analyze(input):
    text = input

    authenticator = IAMAuthenticator('0_uS91NBJE3UE1eexwctr9XBFE2ZPcbfiliFw2C8s5jY')
    natural_language_understanding = NaturalLanguageUnderstandingV1(
        version='2019-07-12',
        authenticator=authenticator
    )

    natural_language_understanding.set_service_url(
        'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/aa8a29ed-306c-42c1-a327-865fc55dfb75')

    response = natural_language_understanding.analyze(text=text, features=Features(
        entities=EntitiesOptions(model="20:e58fd655-9254-4bef-90c1-db6d0ff94aad"))).get_result()
    response = response['entities']
    response1=""
    if len(response) > 0:
        response = response[0]['type']
        response1=response
        print(input, response)
    response = natural_language_understanding.analyze(text=text,
                                                      features=Features(emotion=EmotionOptions())).get_result()
    response = response['emotion']['document']['emotion']
    responsepos = [response['sadness'], response['joy'], response['fear'], response['disgust'], response['anger']]
    responsepos = responsepos.index(max(responsepos))
    response = ['sadness', 'joy', 'fear', 'disgust', 'anger'][responsepos]
    return (response1+" "+response)

class SimpleEcho(WebSocket):

    def handleMessage(self):
        # echo message back to client
        e = self.data

        self.sendMessage(analyze(e))

    def handleConnected(self):
        print(self.address, 'connected')

    def handleClose(self):
        print(self.address, 'closed')


server = SimpleWebSocketServer('', 8000, SimpleEcho)
server.serveforever()



