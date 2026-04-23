# dan-rc-data-scdd container image for Google Cloud Run.
#
# Minimal static-site container. Node 24 + Express. Data folder contains
# ~20 per-RC POS expenditure xlsx files (~1-2 MB each).

FROM node:24-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund

COPY . .

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
