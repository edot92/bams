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
    timestamp = int(msg.payload[3:11], 16)

    # Hanya node kode sb2 yang memiliki data akselerometer axial ketiga sebanyak 100 data.
    # Node sb2 ada 300 data, selain itu 200 data akselerometer saja.
    if node == 'sb2':
        total_akselerometer = len(msg.payload[11:311])
        print(msg.payload[311:])
    else:
        total_akselerometer = len(msg.payload[11:211])
        print(msg.payload[211:])

    acc = [struct.unpack('!f', bytes.fromhex(msg.payload[i:i+n].decode('ascii')))[0]
           for i in range(11, total_akselerometer, n)]

    print(node, timestamp, acc[0], acc[1], '...\n')


if __name__ == "__main__":
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    print("Connecting to broker...")

    client.connect("bbta3.bppt.go.id", 9621)
    try:
        client.username_pw_set(os.environ['MQ_USER'], os.environ['MQ_PWD'])
    except KeyError:
        print('Silahkan tambah env. untuk MQ_USER dan/atau MQ_PWD')
        sys.exit()

    client.loop_forever()