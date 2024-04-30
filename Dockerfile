FROM oven/bun:slim

WORKDIR /app
EXPOSE 3000

ENV NODE_ENV="production"
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT $PORT
ENV HOSTNAME 0.0.0.0

COPY ./public ./public
COPY ./.next/standalone ./
COPY ./.next/static ./.next/static

RUN rm -rf node_modules && bun install --frozen-lockfile

CMD [ "bun", "./server.js" ]