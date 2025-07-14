import { WebView } from 'react-native-webview';

export default function CheckoutWebView({ route }) {
  const { checkoutUrl } = route.params;
  return <WebView source={{ uri: checkoutUrl }} />;
}
