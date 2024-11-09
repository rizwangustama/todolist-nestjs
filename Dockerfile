# Menggunakan image Node.js sebagai base image
FROM node:18 AS build

# Set working directory
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Menyalin seluruh file proyek ke dalam container
COPY . .

# Build aplikasi NestJS
RUN npm run build

# Menggunakan image Node.js lagi untuk tahap produksi
FROM node:18-slim

# Set working directory di container
WORKDIR /usr/src/app

# Menyalin file build dari tahap sebelumnya
COPY --from=build /usr/src/app/dist ./dist

# Install hanya dependensi produksi
COPY package*.json ./
RUN npm install --only=production

# MengExpose port yang digunakan aplikasi
EXPOSE 3000

# Menjalankan aplikasi ketika container dimulai
CMD ["node", "dist/main"]
