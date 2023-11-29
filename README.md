# client configuration

- ```npx expo prebuild``` to get the ios and android folders to run the project on the simulator
- ```cd ios && pod install```
- ```yarn && yarn start```

# server configuration

- ```cd server && npm install```
- ```npm run dev```

# running on device
- run ifconfig on mac and use ip address instead of localhost to connect to express


To intercept calls to and from your Express server using Charles Proxy, you need to set up your development environment and mobile device to route traffic through Charles. Here's a basic guide on how to do this:

1. **Set Up Charles Proxy**:
   - Install Charles Proxy on your development machine.
   - Open Charles and go to the Proxy menu, select Proxy Settings, and note down the port number (usually 8888).

2. **Configure Your Mobile Device**:
   - Connect your mobile device to the same network as your development machine.
   - Go to your device's Wi-Fi settings and modify the network configuration to use a manual proxy.
   - Enter the IP address of your development machine and the port number on which Charles is running (e.g., 8888).

3. **Trust Charles SSL Certificate on Your Device**:
   - On your mobile device, open a browser and visit `chls.pro/ssl` to download the Charles SSL certificate.
   - Install the downloaded certificate. On iOS, you might also need to enable full trust for the certificate in the settings.

4. **Enable SSL Proxying in Charles**:
   - In Charles, right-click on your Express server’s host and choose “Enable SSL Proxying”.
   - If you don’t see your host, first make a request from your app, and it should appear in the Charles session list.

5. **Test Your Setup**:
   - Use your app to make a request to your Express server.
   - Charles should now capture the request and response, allowing you to view or modify the data.


<img width="390" alt="Screenshot 2023-11-26 at 10 48 04" src="https://github.com/dancomanlive/react-query-offline/assets/16872821/919d2ab1-cca6-4ef7-b4f7-e1ad5ebd33ef">