# Shopping Vue

### 기간: 2025-03-01 ~ 2025-03-30

## 애플리케이션 이미지

<div class="image-gallery">
    <div class="image-card">
        <h4>메인 페이지</h4>
        <img src="image/main page.jpeg" alt="Main Page">
    </div>
    <div class="image-card">
        <h4>상품 상세</h4>
        <img src="image/product detail.jpeg" alt="Product Detail">
    </div>
    <div class="image-card">
        <h4>장바구니</h4>
        <img src="image/cart.jpeg" alt="Cart">
    </div>
    <div class="image-card">
        <h4>상품 구매 1</h4>
        <img src="image/checkout1.jpeg" alt="Checkout 1">
    </div>
    <div class="image-card">
        <h4>상품 구매 2</h4>
        <img src="image/checkout2.jpeg" alt="Checkout 2">
    </div>
    <div class="image-card">
        <h4>상품 주문 완료</h4>
        <img src="image/buy.jpeg" alt="Buy">
    </div>
    <div class="image-card">
        <h4>이벤트 참여</h4>
        <img src="image/event.jpeg" alt="Event">
    </div>
    <div class="image-card">
        <h4>이벤트 참여 실패(이미 참여)</h4>
        <img src="image/event fail.jpeg" alt="Event Fail">
    </div>
    <div class="image-card">
        <h4>주문 리스트</h4>
        <img src="image/order list.jpeg" alt="Order List">
    </div>
    <div class="image-card">
        <h4>리뷰 작성</h4>
        <img src="image/review write.jpeg" alt="Review Write">
    </div>
    <div class="image-card">
        <h4>리뷰 확인</h4>
        <img src="image/review detail.jpeg" alt="Review Detail">
    </div>
</div>

<style>
  .image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    padding: 0;
  }

.image-card {
display: flex;
flex-direction: column;
align-items: center;
background: #fff;
border-radius: 12px;
box-shadow: 0 2px 8px rgba(0,0,0,0.05);
overflow: hidden;
}

.image-card h4 {
margin: 1rem 0 0.5rem;
font-size: 1rem;
color: #222;
}

.image-card img {
width: 100%;
max-width: 360px;
height: auto;
object-fit: cover;
}
</style>
