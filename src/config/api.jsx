
export const TrendingCoins = (currency) => {
    `https://api.coingecko.com/api/v3/search/trending?vs_currency=${currency}`
}

export const SingleCoins = (id) => {
    `https://api.coingecko.com/api/v3/coins/${id}`
}

export const CoinList = (currency) => {
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`
}

export const Chart = (id, currency, days = 365) => {
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
}