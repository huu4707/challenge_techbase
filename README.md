# challenge_techbase

I: Thực thi ứng dụng

1. Cài đặt
   - Nodejs
   - mysql
   - typescript (npm -g install typescript || yarn -g add typescript), pm2 (npm -g install pm2 || yarn -g add pm2)
2. cài đặt thư viện và tạo database
   - chạy lệnh yarn install
   - Tạo sẵn database challenge_techbase
   - Copy file example.env sửa tên thành env. và cấu hình
3. Chạy ứng dụng
   - Chạy không cần build: yarn run ts-start-server
   - Chạy cần build: yarn build xong chạy yarn run ts-start-server
   - Chạy bằng pm2: yarn build xong chạy pm2 start ecosystem.config.js

II: Chạy unit test

chạy lệnh yarn test
