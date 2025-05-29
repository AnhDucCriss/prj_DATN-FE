// Interface cho response từ API
export interface RevenueStatsResponse {
  totalRevenuePaid: number;
  totalRevenueUnpaid: number;
  totalInvoicesPaid: number;
  totalInvoicesUnpaid: number;
}

// Interface cho hiển thị trong table
export interface RevenueStatsDisplay {
  label: string;
  value: string;
  count: number;
  status: 'success' | 'warning' | 'info' | 'danger';
  icon: string;
}

// Hàm chuyển đổi dữ liệu từ API response sang format hiển thị
export function mapRevenueStatsToDisplay(data: RevenueStatsResponse): RevenueStatsDisplay[] {
  return [
    {
      label: 'Doanh thu đã thanh toán',
      value: formatCurrency(data.totalRevenuePaid),
      count: data.totalInvoicesPaid,
      status: 'success',
      icon: 'ti-wallet'
    },
    {
      label: 'Doanh thu chưa thanh toán',
      value: formatCurrency(data.totalRevenueUnpaid),
      count: data.totalInvoicesUnpaid,
      status: 'warning',
      icon: 'ti-credit-card'
    }
  ];
}

// Hàm format tiền tệ
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}