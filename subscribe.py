import os
import sys
import struct
import paho.mqtt.client as mqtt


# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("BAMS")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    n = 8  # split every 8 characters
    node = msg.payload[0:3].decode('ascii')
    timestamp = int(msg.payload[3:11], 16) * 1000  # dalam satuan ms

    sensor = [struct.unpack('!f', bytes.fromhex(msg.payload[i:i+n].decode('ascii')))[0]
           for i in range(11, len(msg.payload[11:]) + n, n)]

    if node == "sb1" or node == "sb2":
        acc = sensor[:-3]  # dalam bentuk List
        ane1 = sensor[-1]  # dalam bentuk Scalar
        ane2 = sensor[-2]  # dalam bentuk Scalar
        ane3 = sensor[-3]  # dalam bentuk Scalar

    else :
        acc = sensor  # dalam bentuk List
        ane1 = 0  # dalam bentuk Scalar
        ane2 = 0  # dalam bentuk Scalar
        ane3 = 0  # dalam bentuk Scalar

    print(node, timestamp)
    print(acc, '\n')


if __name__ == "__main__":
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    print("Connecting to broker...")

    client.connect("bbta3.bppt.go.id", 9621)

    try:
        client.username_pw_set(os.getenv('MQ_USER'), os.getenv('MQ_PWD'))
    except KeyError:
        print('Silahkan tambah env. untuk MQ_USER dan/atau MQ_PWD')
        sys.exit()

    client.loop_forever()