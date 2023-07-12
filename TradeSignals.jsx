import React from 'react';
import { Center, Box, Text } from "@chakra-ui/react";
import EthCoinGecko from "./EthCoinGecko";
import EthTradingSignals from "./EthTradingSignals";
import BtcCoinGecko from "./BtcCoinGecko";
import BtcTradingSignals from "./BtcTradingSignals";
import TlosCoinGecko from "./TlosCoinGecko";
import TlosTradingSignals from "./TlosTradingSignals";

export default function TradeSignals(){
    return(
        <>
            <Center bg="ghostwhite" p={2} w="100%">
                <Box w={'auto'} bg="white" p={2}>
                    <Text>Trade Signals</Text>
                    <Text fontSize={'10px'}>* CoinGecko</Text>
                    <Box bg="white" p={2}>
                        <EthCoinGecko />
                        <EthTradingSignals />
                    </Box>
                    <Box bg="white" p={2}>
                        <TlosCoinGecko />
                        <TlosTradingSignals />
                    </Box>
                    <Box bg="white" p={2}>
                        <BtcCoinGecko />
                        <BtcTradingSignals />
                    </Box>
                </Box>
            </Center>
        </>
    )
}
