export default {
    /**
     * 价格处理，调整精度
     */
    priceToFixed(value, precision) {
        if (!value || !isNaN(value)) {
            return value;
        }
        value = parseFloat(value);
        precision = precision || 2;
        return value.toFixed(precision);
    }
}
