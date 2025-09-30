const createTransaction = async (cartId, userId) => {
    // TODO: Integrasi ke payment gateway beneran
    return `https://payment-gateway.com/pay/${cartId}-${userId}`;
};

const getTransactionStatus = async (orderId) => {
    // TODO: Integrasi ke payment gateway
    return { orderId, status: "pending" };
};

const getUserTransactions = async (userId) => {
    // TODO: Ambil dari DB Supabase
    return [{ id: 1, userId, status: "success" }];
};

const refundTransaction = async (orderId) => {
    // TODO: Integrasi refund ke payment gateway
    return { orderId, refundStatus: "processed" };
};

const handleWebhook = async (payload) => {
    // TODO: Simpan callback ke DB
    return payload;
};

module.exports = {
    createTransaction,
    getTransactionStatus,
    getUserTransactions,
    refundTransaction,
    handleWebhook
};