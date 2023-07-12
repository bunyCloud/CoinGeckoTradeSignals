# CoinGeckoTradeSignals
CoinGecko trade signals for ETH, BTC, TLOS
#
TlosTradingSignals Component
This React component fetches historical price data for Telos (TLOS) cryptocurrency and generates trading signals based on technical analysis. The two indicators used for this purpose are Simple Moving Average (SMA) and Relative Strength Index (RSI). The component also incorporates a long bias and a short bias in the generation of these signals, with a stronger bias towards long positions.

How It Works
Fetch Historical Data: Using the Axios library, the component makes a request to the CryptoCompare API to fetch the last 200 days of daily closing prices for TLOS.

Calculate Indicators: The component then calculates a 20-day SMA and a 14-day RSI based on this historical data.

Generate Trading Signals: The component uses the calculated SMA and RSI to generate trading signals. The rules for signal generation are as follows:

If the latest closing price is above the SMA and the RSI is less than 21, the signal is 'Buy'.
If the RSI is above 96, indicating extreme overbought conditions, the signal is 'Short'.
If the RSI is above 91, the signal is 'Sell'.
Otherwise, the signal is 'Hold'.
