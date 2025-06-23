# Hướng Dẫn Sử Dụng GitHub Cho Dự Án Tech Store

Hướng dẫn này cung cấp quy trình làm việc trên GitHub cho dự án **Tech Store**, một trang web thương mại điện tử bán đồ công nghệ với chatbox tích hợp AI. Nhóm gồm 6 thành viên: 3 lập trình viên Frontend và 3 lập trình viên Backend. Hãy làm theo hướng dẫn này để quản lý mã nguồn, phân chia công việc và cộng tác hiệu quả.

## 1. Tổng Quan Dự Án
- **Repository**: `https://github.com/<username>/tech-store`
- **Nhóm**:
  - **Frontend Dev 1**: Trang chủ, Danh mục sản phẩm, Chi tiết sản phẩm
  - **Frontend Dev 2**: Giỏ hàng, Thanh toán, Quản lý đơn hàng
  - **Frontend Dev 3**: Đăng nhập, Đăng ký, Liên hệ, Admin, Chatbox
  - **Backend Dev 1**: API sản phẩm, API quản lý sản phẩm cho admin
  - **Backend Dev 2**: API giỏ hàng, đơn hàng
  - **Backend Dev 3**: API người dùng, liên hệ, admin, chatbox AI
- **Công cụ**:
  - GitHub: Lưu trữ mã, quản lý công việc
  - Git: Kiểm soát phiên bản
  - Giao tiếp: Slack/Discord (cho họp nhóm hàng ngày)
  - Bảng công việc: `/docs/Detailed_Task_Board.xlsx` (trong repo)

## 2. Thiết Lập Repository
1. **Tải repository về máy**:
   ```bash
   git clone https://github.com/<username>/tech-store.git
   cd tech-store
   ```
2. **Tạo nhánh `dev`** (nếu chưa có):
   ```bash
   git checkout -b dev
   git push origin dev
   ```
3. **Cấu trúc nhánh**:
   - `main`: Mã ổn định, dùng để triển khai
   - `dev`: Nhánh tích hợp các tính năng mới
   - `feature/<tên-dev>/<task-id>`: Nhánh tính năng (VD: `feature/frontend1/F02-home-page`)
   - `bugfix/<tên-dev>/<issue-id>`: Nhánh sửa lỗi (nếu cần)

## 3. Thiết Lập Môi Trường
### Frontend (`client`)
```bash
cd client
npm install
cp .env.example .env
# Cập nhật file .env (nếu cần)
npm start
```
- Chạy trên `http://localhost:3000`
- Thư viện: `react`, `axios`, `react-router-dom`, `tailwindcss`

### Backend (`server`)
```bash
cd server
npm install
cp .env.example .env
# Cập nhật file .env với DB_HOST, OPENAI_API_KEY, v.v.
npm start
```
- Chạy trên `http://localhost:5000`
- Thư viện: `express`, `mysql2`, `cors`, `dotenv`, `openai`, v.v.

## 4. Quản Lý Công Việc
Danh sách công việc được liệt kê trong `/docs/Detailed_Task_Board.xlsx`. Mỗi công việc bao gồm:
- **Task ID**: Mã công việc (VD: F01, B01)
- **Mô tả**: Công việc cần thực hiện
- **Người thực hiện**: Frontend Dev 1/2/3 hoặc Backend Dev 1/2/3
- **Phụ thuộc**: Công việc cần hoàn thành trước
- **File liên quan**: File cần tạo hoặc chỉnh sửa

### Các bước nhận công việc:
1. Xem `/docs/Detailed_Task_Board.xlsx` hoặc GitHub Issues để chọn công việc.
2. Đảm bảo các công việc phụ thuộc đã hoàn thành (VD: F02 phụ thuộc B01).
3. Nhận công việc bằng cách bình luận trên GitHub Issue (VD: "Tôi đang làm F02").
4. Cập nhật trạng thái trên GitHub Projects (chuyển sang "In Progress").

## 5. Quy Trình Phát Triển
### Bước 1: Tạo nhánh tính năng
```bash
git checkout dev
git pull origin dev
git checkout -b feature/<tên-dev>/<task-id>
# Ví dụ: git checkout -b feature/frontend1/F02-home-page
```

### Bước 2: Thực hiện công việc
- **Frontend**: Tạo/chỉnh sửa component hoặc trang trong `client/src`.
- **Backend**: Tạo/chỉnh sửa model, controller, hoặc route trong `server`.
- Tuân thủ chuẩn code:
  - Sử dụng ESLint/Prettier để đảm bảo code nhất quán.
  - Viết commit message rõ ràng: `<Task ID>: <Mô tả>` (VD: `F02: Tạo trang chủ với danh sách sản phẩm`).
- Kiểm tra cục bộ:
  - Frontend: Xem giao diện trên `http://localhost:3000`.
  - Backend: Test API bằng Postman.

### Bước 3: Commit và đẩy mã
```bash
git add .
git commit -m "<Task ID>: <Mô tả>"
git push origin feature/<tên-dev>/<task-id>
```

### Bước 4: Tạo Pull Request (PR)
1. Truy cập repository trên GitHub.
2. Nhấp **New Pull Request**.
3. Chọn nhánh đích là `dev` và nhánh nguồn là nhánh tính năng của bạn.
4. Điền thông tin PR:
   - **Tiêu đề**: `<Task ID>: <Mô tả>` (VD: `F02: Tạo trang chủ với danh sách sản phẩm`)
   - **Mô tả**: Tóm tắt thay đổi, liên kết với Issue (VD: `Closes #12`)
   - **Người thực hiện**: Chính bạn
   - **Người review**: Ít nhất một thành viên khác (VD: Frontend Dev 2 review cho PR của Frontend Dev 1)
5. Gửi PR và chờ review.

### Bước 5: Review PR
- Người review kiểm tra:
  - Chức năng: Có đáp ứng yêu cầu công việc không?
  - Chất lượng code: Sạch, dễ đọc, không lỗi.
  - Kiểm tra: Chạy thử cục bộ (giao diện cho Frontend, API cho Backend).
- Bình luận phản hồi hoặc yêu cầu chỉnh sửa.
- Phê duyệt PR nếu không có vấn đề.

### Bước 6: Merge PR
- Sau khi được phê duyệt, merge PR vào `dev`.
- Xóa nhánh tính năng:
  ```bash
  git push origin --delete feature/<tên-dev>/<task-id>
  ```
- Cập nhật nhánh `dev` cục bộ:
  ```bash
  git checkout dev
  git pull origin dev
  ```

## 6. Sửa Lỗi
- Tạo nhánh sửa lỗi:
  ```bash
  git checkout dev
  git checkout -b bugfix/<tên-dev>/<issue-id>
  ```
- Thực hiện commit, đẩy mã, và tạo PR như quy trình phát triển.
- Liên kết PR với Issue báo lỗi.

## 7. Triển Khai
- Khi một module hoàn thành (VD: Trang chủ với API sản phẩm), merge `dev` vào `main`:
  ```bash
  git checkout main
  git pull origin main
  git merge dev
  git push origin main
  ```
- Triển khai:
  - Frontend: Vercel (kết nối với nhánh `main`)
  - Backend: Heroku (kết nối với nhánh `main`)
- Kiểm tra ứng dụng trên môi trường production để phát hiện lỗi.

## 8. Công Cụ GitHub
- **Issues**: Theo dõi công việc và lỗi.
  - Ví dụ: Tạo Issue cho F02 với nhãn `frontend`, `feature`.
  - Gán cho thành viên và liên kết với Project.
- **Projects**: Sử dụng bảng Kanban (`Tech Store Kanban`) với các cột:
  - To Do (Chưa làm)
  - In Progress (Đang làm)
  - Review (Đang review)
  - Done (Hoàn thành)
- **Actions** (tùy chọn): Thiết lập CI/CD để tự động kiểm tra code hoặc triển khai.
- **Discussions**: Dùng để đặt câu hỏi hoặc thảo luận ý tưởng.

## 9. Giao Tiếp Nhóm
- **Họp hàng ngày**: 15-30 phút lúc 9h sáng hoặc 5h chiều (qua Slack/Discord).
  - Cập nhật tiến độ, báo cáo khó khăn, và công việc tiếp theo.
- **Slack/Discord**: Hỏi đáp nhanh hoặc thông báo.
- **GitHub Comments**: Thảo luận chi tiết về công việc trên Issues hoặc PRs.

## 10. Thực Tiễn Tốt Nhất
- **Commit thường xuyên**: Commit nhỏ, rõ ràng để dễ theo dõi.
- **Pull thường xuyên**: Cập nhật `dev` trước khi bắt đầu công việc mới để tránh xung đột.
- **Kiểm tra cục bộ**: Đảm bảo code hoạt động trước khi đẩy lên.
- **Review cẩn thận**: Phát hiện lỗi sớm để giảm bug.
- **Tài liệu**: Cập nhật `README.md` hoặc `/docs/` nếu thay đổi thiết lập.
- **Bảo mật**: Lưu API key trong `server/.env`, không commit `.env`.

## 11. Khắc Phục Sự Cố
- **Xung đột merge**:
  ```bash
  git pull origin dev
  # Giải quyết xung đột trong code editor
  git add .
  git commit
  git push
  ```
- **Vấn đề PR**: Hỏi người review nếu cần làm rõ phản hồi.
- **Lỗi thiết lập**: Xem `README.md` hoặc hỏi nhóm trên Slack/Discord.
- **Lỗi API**: Test bằng Postman, kiểm tra log server (`npm start`).

## 12. Tài Nguyên
- **Bảng công việc**: `/docs/Detailed_Task_Board.xlsx`
- **Tài liệu GitHub**: https://docs.github.com/
- **Hướng dẫn Git**: https://git-scm.com/docs
- **Cấu trúc dự án**:
  - Frontend: `client/src/components`, `client/src/pages`
  - Backend: `server/models`, `server/controllers`, `server/routes`

---

# HUNIVAFashion
