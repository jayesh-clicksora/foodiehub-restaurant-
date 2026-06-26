import { useEffect, useState, useCallback } from "react";
import API from "../api/api";

function Orders({ darkMode }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [typedOtp, setTypedOtp] = useState("");

  const fetchOrders = useCallback(async () => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      setOrders([]);
      setLoading(false);
      return;
    }

    let user;
    try {
      user = JSON.parse(savedUser);
    } catch {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      const res = await API.get(`/orders/${user.id}`);
      setOrders(res.data?.orders ?? res.data ?? []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 1. ऑर्डर कैंसिल करने का फंक्शन
  const cancelOrder = async (id) => {
    if (!window.confirm("क्या आप वाकई इस ऑर्डर को कैंसिल करना चाहते हैं?"))
      return;
    try {
      await API.put(`/orders/cancel/${id}`);
      alert("Order cancelled successfully");
      fetchOrders();
    } catch (error) {
      alert("Failed to cancel order.");
    }
  };

  // 2. नॉर्मल ओटीपी मंगाने का फंक्शन
  const sendOtp = async (id) => {
    try {
      const res = await API.post("/orders/send-delivery-otp", { order_id: id });
      alert(`OTP Sent Successfully! \n\nआपका टेस्टिंग OTP है: ${res.data.otp}`);
      setActiveOrderId(id);
    } catch (error) {
      console.error(error);
      alert(
        "Failed to send OTP. कृपया चेक करें कि बैकएंड सर्वर चल रहा है या नहीं।",
      );
    }
  };

  // 3. ओटीपी सबमिट करने का फंक्शन
  const handleVerifyOtp = async (id) => {
    if (!typedOtp) return alert("Please enter OTP");
    try {
      const res = await API.put("/orders/verify-delivery-otp", {
        order_id: id,
        user_otp: typedOtp,
      });
      if (res.data.success) {
        alert("Order Delivered Successfully! 🎉");
        setActiveOrderId(null);
        setTypedOtp("");
        fetchOrders();
      }
    } catch (error) {
      alert(error.response?.data?.message || "गलत OTP है, फिर से ट्राई करें।");
    }
  };

  // ==========================================
  // 🎯 यहाँ है असली जादू - डायनामिक थीमींग लॉजिक
  // ==========================================
  // डार्क मोड में तुम्हारी होमपेज जैसा नेवी ब्लू/ब्लैक शेड (#0f172a) रहेगा, लाइट मोड में एकदम साफ़ सफेद (#ffffff)
  const bgPageColor = darkMode ? "#0f172a" : "#ffffff";
  const bgCardColor = darkMode ? "#1e293b" : "#f8fafc"; // कार्ड का रंग मोड के हिसाब से बदलेगा
  const textColor = darkMode ? "#ffffff" : "#1e293b"; // अक्षर: डार्क मोड में सफेद, लाइट मोड में डार्क ग्रे/ब्लैक
  const textMutedColor = darkMode ? "#94a3b8" : "#64748b"; // तारीख का हल्का रंग
  const borderCardColor = darkMode ? "#334155" : "#e2e8f0"; // बॉर्डर्स

  if (loading)
    return (
      <div
        style={{
          padding: 40,
          color: textColor,
          backgroundColor: bgPageColor,
          minHeight: "100vh",
        }}
      >
        Loading orders...
      </div>
    );

  if (!orders || orders.length === 0)
    return (
      <div
        style={{
          padding: 40,
          color: textColor,
          backgroundColor: bgPageColor,
          minHeight: "100vh",
        }}
      >
        <h2>No Orders Found</h2>
      </div>
    );

  return (
    <div
      style={{
        padding: "clamp(16px, 4vw, 40px) clamp(10px, 3vw, 20px)",
        backgroundColor: bgPageColor,
        color: textColor,
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <h1
        style={{
          color: textColor,
          marginBottom: "clamp(14px, 3vw, 20px)",
          fontSize: "clamp(22px, 5vw, 32px)",
        }}
      >
        Your Orders
      </h1>
      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        {orders.map((o) => (
          <div
            key={o.id}
            style={{
              padding: 20,
              borderRadius: 12,
              border: `1px solid ${borderCardColor}`,
              backgroundColor: bgCardColor,
              color: textColor,
              boxShadow: darkMode ? "none" : "0 4px 6px -1px rgb(0 0 0 / 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <strong style={{ color: textColor, fontSize: "16px" }}>
                Order #{o.id}
              </strong>
              <span style={{ color: textMutedColor, fontSize: "14px" }}>
                {new Date(
                  o.created_at || o.created || o.date || Date.now(),
                ).toLocaleString()}
              </span>
            </div>

            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: "1 1 220px" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: textColor,
                  }}
                >
                  Total: ₹{o.total_price}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    color: textMutedColor,
                    fontSize: "14px",
                  }}
                >
                  Status:{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        o.status === "Delivered"
                          ? "#10b981"
                          : o.status === "Cancelled"
                            ? "#ef4444"
                            : "#f59e0b",
                    }}
                  >
                    {o.status || "Pending"}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  alignItems: "flex-end",
                }}
              >
                {o.status !== "Cancelled" && o.status !== "Delivered" && (
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => cancelOrder(o.id)}
                      style={{
                        backgroundColor: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Cancel Order
                    </button>
                    <button
                      onClick={() => sendOtp(o.id)}
                      style={{
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Get Delivery OTP
                    </button>
                  </div>
                )}

                {o.status === "Delivered" && (
                  <span
                    style={{
                      color: "#10b981",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    ✓ Order Successful (Delivered)
                  </span>
                )}
                {o.status === "Cancelled" && (
                  <span style={{ color: "#ef4444", fontWeight: "600" }}>
                    ✕ Order Cancelled
                  </span>
                )}
              </div>
            </div>

            {/* OTP बॉक्स */}
            {activeOrderId === o.id && (
              <div
                style={{
                  marginTop: 16,
                  padding: 12,
                  background: darkMode ? "#1e293b" : "#f1f5f9",
                  borderRadius: 8,
                  border: `1px solid ${borderCardColor}`,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={typedOtp}
                  onChange={(e) => setTypedOtp(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "1px solid #cbd5e1",
                    backgroundColor: darkMode ? "#334155" : "#ffffff",
                    color: textColor,
                    flex: "1 1 160px",
                    minWidth: 140,
                    marginRight: 0,
                  }}
                />
                <button
                  onClick={() => handleVerifyOtp(o.id)}
                  style={{
                    backgroundColor: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: "500",
                    flex: "0 0 auto",
                  }}
                >
                  Submit & Complete Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
