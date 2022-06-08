export const numberAbbre = (value) => {
    if (value >= 999) {
        return `${Math.sign(value) * ((Math.abs(value) / 1000).toFixed(1))}K`;
    }
    if (value >= 999999) {
        return `${Math.sign(value) * ((Math.abs(value) / 1000000).toFixed(1))}M`;
    }
    if (value >= 999999999) {
        return `${Math.sign(value) * ((Math.abs(value) / 1000000000).toFixed(1))}B`;
    }
    return value;
};

export const numberFormat = (value) => {
    return new Intl.NumberFormat('id-ID', {}).format(value);
};
