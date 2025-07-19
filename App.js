import React, { useEffect, useCallback, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Contexts
import { ProductProvider } from './context/ProductContext.native';
import { CartProvider } from './context/CartContext.native';
import { AuthProvider } from './context/AuthContext.native';
import { FavouriteProvider } from './context/FavouriteContext.native';

// Screens (same as your original import list)
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';
import GrainsScreen from './screens/GrainsScreen';
import FloursScreen from './screens/FloursScreen';
import SpicesScreen from './screens/SpicesScreen';
import SnacksScreen from './screens/SnacksScreen';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import OTPScreen from './screens/OTPScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import SuccessScreen from './screens/SuccessScreen';
import FAQScreen from './screens/FAQScreen';
import HelpScreen from './screens/HelpScreen';
import ReferralScreen from './screens/ReferralScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import TermsScreen from './screens/TermsScreen';
import LoginSecurityScreen from './screens/LoginSecurityScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import PersonalDataScreen from './screens/PersonalDataScreen';
import AddressListScreen from './screens/AddressListScreen';
import DeleteAccountScreen from './screens/DeleteAccountScreen';
import AccountDeletedScreen from './screens/AccountDeletedScreen';
import AccountRestoredScreen from './screens/AccountRestoredScreen';

// Prevent auto-hiding the splash screen
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Category') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Orders') iconName = focused ? 'cube' : 'cube-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#47241C',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          Outfit: require('./assets/fonts/Outfit-Regular.ttf'), // adjust the path as needed
          'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
        });

        // 👇 Global default font override
        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.style = { fontFamily: 'Outfit' };
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <FavouriteProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <NavigationContainer onReady={onLayoutRootView}>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="GrainsScreen" component={GrainsScreen} />
                <Stack.Screen name="FloursScreen" component={FloursScreen} />
                <Stack.Screen name="SpicesScreen" component={SpicesScreen} />
                <Stack.Screen name="SnacksScreen" component={SnacksScreen} />
                <Stack.Screen name="CartScreen" component={CartScreen} />
                <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
                <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
                <Stack.Screen name="OTPScreen" component={OTPScreen} />
                <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
                <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
                <Stack.Screen name="ReferralScreen" component={ReferralScreen} />
                <Stack.Screen name="HelpScreen" component={HelpScreen} />
                <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
                <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
                <Stack.Screen name="TermsScreen" component={TermsScreen} />
                <Stack.Screen name="FAQScreen" component={FAQScreen} />
                <Stack.Screen name="LoginSecurityScreen" component={LoginSecurityScreen} />
                <Stack.Screen name="PersonalDataScreen" component={PersonalDataScreen} />
                <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
                <Stack.Screen name="AddressListScreen" component={AddressListScreen} />
                <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
                <Stack.Screen name="AccountDeletedScreen" component={AccountDeletedScreen} />
                <Stack.Screen name="AccountRestoredScreen" component={AccountRestoredScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </FavouriteProvider>
  );
}
