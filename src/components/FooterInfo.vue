<template>
  <div class="footer-info">
    <!-- 상단 메뉴 영역 -->
    <ul class="footer-links">
      <li><a href="#">회사소개</a></li>
      <li><a href="#">이용약관</a></li>
      <li><a href="#">개인정보처리방침</a></li>
      <li><a href="#">청소년보호정책</a></li>
      <li><a href="#">전자금융거래약관</a></li>
      <li><a href="#">판매이용약관</a></li>
      <li><a href="#">서비스 이용약관</a></li>
    </ul>

    <!-- 회사 정보 / 저작권 영역 -->
    <div class="footer-company-info">
      <p>상호명 및 호스팅 서비스 제공 : MyShoppingMall (주)</p>
      <p>사업자등록번호: 000-00-00000 | 통신판매업신고: 0000-일이삼사-0000</p>
      <p>대표이사: 홍길동 | 소재지: 경기도 성남시 황새울로</p>
      <p>고객센터: 1500-0000</p>
      <p>이메일: epfzja1234@gmail.com</p>
      <p class="copyright">
        &copy; Designed by GPT-o3
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterInfo"
}
</script>

<style scoped>
.footer-info {
  background-color: #f9f9f9;
  color: #666;
  font-size: 0.9em;
  padding: 20px 20px 70px;
  line-height: 1.4;
  border-top: 1px solid #ddd;
}

.footer-links {
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 */
  gap: 10px;
  margin-bottom: 15px;
  padding: 0;
  list-style: none;
}

.footer-links li {
  margin-right: 5px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  font-size: 0.9em;
}

.footer-links a:hover {
  text-decoration: underline;
}

.footer-company-info p {
  margin: 2px 0;
}

.footer-company-info {
  margin-top: 10px;
  color: #999;
}

.footer-company-info .copyright {
  margin-top: 10px;
  font-size: 0.85em;
  color: #aaa;
}
</style>
