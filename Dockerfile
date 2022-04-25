FROM uguraslan/node-libvips:latest

# RUN apk add --update 
# RUN apk add python3 make g++

WORKDIR /app
COPY ./package.json .
RUN npm config set unsafe-perm true
RUN yarn
COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

EXPOSE 3001

CMD yarn build && yarn start:prod
