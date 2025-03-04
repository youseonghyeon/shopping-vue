<template>
  <div class="order-list-page">
    <HeaderComponent />

    <div class="content">
      <h2>주문목록</h2>
      <p>최근 주문 내역을 확인하세요.</p>

      <!-- 주문 목록 테이블 -->
      <table class="order-table" v-if="orders.length > 0">
        <thead>
        <tr>
          <th>주문번호</th>
          <th>상품명</th>
          <th>주문일</th>
          <th>상태</th>
          <th>가격</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order.orderId">
          <td>{{ order.orderId }}</td>
          <td>{{ order.productName }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.price.toLocaleString() }}원</td>
        </tr>
        </tbody>
      </table>

      <!-- 주문 내역이 없을 경우 -->
      <p v-else class="no-orders">주문 내역이 없습니다.</p>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRequest } from '@/api/http.js'
import HeaderComponent from '@/components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'

const orders = ref([])

onMounted(async () => {
  try {
    const response = await getRequest('/orders')
    orders.value = response.data || []
  } catch (error) {
    console.error("주문 내역을 불러오는 중 오류 발생:", error)
  }
})
</script>

<style scoped>
.order-list-page {
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.content {
  padding: 20px;
}

h2 {
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #333;
}

p {
  font-size: 1em;
  color: #666;
}

/* 주문 목록 테이블 스타일 */
.order-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
}

.order-table th,
.order-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.order-table th {
  background-color: #0064ff;
  color: #fff;
  font-weight: bold;
}

.order-table tr:hover {
  background-color: #f2f2f2;
}

.no-orders {
  text-align: center;
  margin-top: 20px;
  color: #888;
}
</style>
