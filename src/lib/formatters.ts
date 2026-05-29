/**
 * Format a number as Nigerian Naira
 */
export const formatNaira = (amount: number | string): string => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
    }).format(num);
};

/**
 * Format a number as currency by code, with safety fallback
 */
export const formatCurrency = (amount: number | string, currencyCode?: string | null): string => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    const safeNum = isNaN(num) ? 0 : num;
    const currency = currencyCode?.toUpperCase() || "NGN";

    try {
        return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 0,
        }).format(safeNum);
    } catch (error) {
        // Fallback with symbol detection
        const symbols: Record<string, string> = {
            NGN: "₦",
            USD: "$",
            GBP: "£",
            EUR: "€",
        };
        const symbol = symbols[currency] || currency;
        return `${symbol} ${safeNum.toLocaleString()}`;
    }
};

/**
 * Format a date string to a human readable format
 */
export const formatDate = (dateStr?: string | null): string => {
    if (!dateStr) return "N/A";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return String(dateStr);

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    } catch (e) {
        return String(dateStr);
    }
};

/**
 * Format a date string to relative time (e.g. "2h ago")
 */
export const formatRelativeTime = (dateStr?: string | null): string => {
    if (!dateStr) return "N/A";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return String(dateStr);

        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return formatDate(dateStr);
    } catch (e) {
        return "N/A";
    }
};

/**
 * Calculate progress percentage from paymentCount / maxPayments
 */
export const calcProgress = (paymentCount: number, maxPayments: number | null): number => {
    if (!maxPayments || maxPayments === 0) return 0;
    return Math.min(Math.round((paymentCount / maxPayments) * 100), 100);
};
