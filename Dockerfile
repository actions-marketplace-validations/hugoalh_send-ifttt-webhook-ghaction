FROM node:14.18.2
COPY main.js package-lock.json package.json /opt/hugoalh/trigger-ifttt-webhook-applet-ghaction/
WORKDIR /opt/hugoalh/trigger-ifttt-webhook-applet-ghaction/
RUN ["npm", "ci"]
WORKDIR /
CMD ["node", "/opt/hugoalh/trigger-ifttt-webhook-applet-ghaction/main.js"]
