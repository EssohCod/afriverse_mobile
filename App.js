import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Contexts
import { ProductProvider } from './context/ProductContext.native';
import { CartProvider } from './context/CartContext.native';
import { AuthProvider } from './context/AuthContext.native';
import { FavouriteProvider } from './context/FavouriteContext.native';

// Screens
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

// ✅ Password Reset Screens
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import OTPScreen from './screens/OTPScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import SuccessScreen from './screens/SuccessScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ✅ Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Category') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

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

// ✅ Main App
export default function App() {
  return (
    <FavouriteProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Main Tabs */}
                <Stack.Screen name="MainTabs" component={MainTabs} />

                {/* Product/Cart Related */}
                <Stack.Screen name="GrainsScreen" component={GrainsScreen} />
                <Stack.Screen name="FloursScreen" component={FloursScreen} />
                <Stack.Screen name="SpicesScreen" component={SpicesScreen} />
                <Stack.Screen name="SnacksScreen" component={SnacksScreen} />
                <Stack.Screen name="CartScreen" component={CartScreen} />
                <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
                <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />

                {/* Auth Screens */}
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

                {/* ✅ Password Reset Screens */}
                <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
                <Stack.Screen name="OTPScreen" component={OTPScreen} />
                <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
                <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </FavouriteProvider>
  );
}
