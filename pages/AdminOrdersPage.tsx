import React, { useState, useEffect } from 'react';
import { KHULA_KUSH_GREEN, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_TEXT_MUTED } from '../constants';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  orderType: 'pickup' | 'dine-in' | 'delivery';
  deliveryAddress?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    notes?: string;
  };
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'cancelled';
  paymentMethod?: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  todayOrders: number;
  totalRevenue: number;
}

const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const backendUrl = process.env.VITE_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/orders?status=${filter}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const backendUrl = process.env.VITE_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/orders/stats/summary`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const backendUrl = process.env.VITE_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchOrders();
        fetchStats();
        if (selectedOrder && selectedOrder._id === orderId) {
          const data = await response.json();
          setSelectedOrder(data.order);
        }
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold text-[${KHULA_KUSH_TEXT_HEADING}] mb-2`}>Order Management</h1>
          <p className={`text-[${KHULA_KUSH_TEXT_MUTED}]`}>Manage orders from Highgrounds BLVD customers</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-1`}>Total Orders</p>
              <p className={`text-3xl font-bold text-[${KHULA_KUSH_TEXT_HEADING}]`}>{stats.totalOrders}</p>
            </div>
            <div className={`bg-[${KHULA_KUSH_GREEN}] p-6 rounded-lg shadow text-white`}>
              <p className="text-sm mb-1 opacity-90">Pending Orders</p>
              <p className="text-3xl font-bold">{stats.pendingOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-1`}>Today's Orders</p>
              <p className={`text-3xl font-bold text-[${KHULA_KUSH_TEXT_HEADING}]`}>{stats.todayOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-1`}>Total Revenue</p>
              <p className={`text-3xl font-bold text-[${KHULA_KUSH_GREEN}]`}>R{stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'confirmed', 'preparing', 'ready', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === status
                    ? `bg-[${KHULA_KUSH_GREEN}] text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders List */}
          <div className="space-y-4">
            <h2 className={`text-2xl font-semibold text-[${KHULA_KUSH_TEXT_HEADING}] mb-4`}>Orders</h2>
            {orders.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className={`text-[${KHULA_KUSH_TEXT_MUTED}]`}>No orders found</p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition ${
                    selectedOrder?._id === order._id ? `ring-2 ring-[${KHULA_KUSH_GREEN}]` : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className={`font-bold text-lg text-[${KHULA_KUSH_TEXT_HEADING}]`}>{order.orderNumber}</p>
                      <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}]`}>{order.customerInfo.name}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-sm text-[${KHULA_KUSH_TEXT_BODY}]`}>
                      {order.items.length} item(s) • {order.orderType}
                    </p>
                    <p className={`font-bold text-[${KHULA_KUSH_GREEN}]`}>R{order.totalAmount.toFixed(2)}</p>
                  </div>
                  <p className={`text-xs text-[${KHULA_KUSH_TEXT_MUTED}] mt-2`}>
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <div className="bg-white p-6 rounded-lg shadow sticky top-6 h-fit">
              <h2 className={`text-2xl font-semibold text-[${KHULA_KUSH_TEXT_HEADING}] mb-4`}>Order Details</h2>

              <div className="mb-6">
                <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-1`}>Order Number</p>
                <p className={`text-xl font-bold text-[${KHULA_KUSH_GREEN}]`}>{selectedOrder.orderNumber}</p>
              </div>

              <div className="mb-6">
                <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-2`}>Customer Information</p>
                <p className={`text-[${KHULA_KUSH_TEXT_BODY}]`}><strong>Name:</strong> {selectedOrder.customerInfo.name}</p>
                <p className={`text-[${KHULA_KUSH_TEXT_BODY}]`}><strong>Email:</strong> {selectedOrder.customerInfo.email}</p>
                <p className={`text-[${KHULA_KUSH_TEXT_BODY}]`}><strong>Phone:</strong> {selectedOrder.customerInfo.phone}</p>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-2`}>Order Type</p>
                  <p className={`text-[${KHULA_KUSH_TEXT_BODY}] font-semibold capitalize`}>{selectedOrder.orderType}</p>
                </div>
                <div>
                  <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-2`}>Payment Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedOrder.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                    selectedOrder.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                    selectedOrder.paymentStatus === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedOrder.paymentStatus?.toUpperCase() || 'PENDING'}
                  </span>
                </div>
              </div>

              {selectedOrder.orderType === 'delivery' && selectedOrder.deliveryAddress && (
                <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                  <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-2`}>Delivery Address</p>
                  <p className={`text-[${KHULA_KUSH_TEXT_BODY}]`}>{selectedOrder.deliveryAddress.street}</p>
                  <p className={`text-[${KHULA_KUSH_TEXT_BODY}]`}>{selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.province} {selectedOrder.deliveryAddress.postalCode}</p>
                  {selectedOrder.deliveryAddress.notes && (
                    <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mt-2`}><strong>Notes:</strong> {selectedOrder.deliveryAddress.notes}</p>
                  )}
                </div>
              )}

              <div className="mb-6">
                <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-2`}>Order Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b">
                      <span>{item.name} x{item.quantity}</span>
                      <span>R{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 font-bold">
                    <span>Total</span>
                    <span>R{selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.specialInstructions && (
                <div className="mb-6 p-3 bg-yellow-50 rounded-lg">
                  <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-1`}>Special Instructions</p>
                  <p className={`text-[${KHULA_KUSH_TEXT_BODY}]`}>{selectedOrder.specialInstructions}</p>
                </div>
              )}

              <div className="mb-6">
                <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-2`}>Update Status</p>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <p className={`text-xs text-[${KHULA_KUSH_TEXT_MUTED}]`}>
                Created: {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
