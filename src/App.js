import logo from './logo.svg';
import './App.css';
import {Box, Center} from "@chakra-ui/react"
import TradeSignals from './components/TradeSignals'

function App() {
  return (
<Center>
  <Box>
    <TradeSignals />
  </Box>
</Center>
  );
}

export default App;
