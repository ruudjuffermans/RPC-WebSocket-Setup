from xmlrpc.server import SimpleXMLRPCServer
import time
import random
import socketio
import json

def send_iot_data():
    """ Simulates sending IoT data for a given duration in seconds using a Socket.IO connection. """
    sio = socketio.Client()

    try:
        sio.connect("ws://display:5002")  # Use http instead of ws and ensure the port is correct
        print("Connected to the server.")
        
        for x in range(5):
            # Simulating IoT data with random values
            data = {
                'temperature': random.uniform(20, 30),  # Random temperature between 20-30
                'humidity': random.uniform(40, 60)     # Random humidity between 40-60
            }
            print(f"Sending IoT data: {data}")
            
            # Send data to the Socket.IO server
            sio.emit('message', data)  # Use an appropriate event name

            time.sleep(1)  # Sleep for 1 second to simulate data send rate

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        if sio.connected:
            sio.disconnect()
            print("Disconnected from the server.")

    return "Finished sending IoT data."

def main():
    with SimpleXMLRPCServer(('0.0.0.0', 8000)) as server:
        server.register_introspection_functions()
        server.register_function(send_iot_data, 'send_iot_data')
        
        print("Serving XML-RPC on localhost port 8000...")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("Exiting.")

if __name__ == "__main__":
    main()