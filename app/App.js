import React from 'react';

import {
View,
Image,
TouchableOpacity,
StatusBar,
BottomTabBar
} from 'react-native';

import {
  createAppContainer,
  createTabNavigator,
  createMaterialTopTabNavigator,
  
} from 'react-navigation';

import {
  createDrawerNavigator,
  DrawerActions
} from 'react-navigation-drawer'

import {
  createStackNavigator
} from 'react-navigation-stack';
import {
  createBottomTabNavigator,
} from 'react-navigation-tabs';

import { Icon } from 'react-native-elements'


import SideMenu from './components/appComponents/SideMenu';
import TabBar from './components/appComponents/TabBar';


import EntryView from './components/EntryView';
import EntryListScreen from './components/EntryListScreen';
import Page from './components/Page';
import Category from './components/CategoryScreen';
import CategoryOverview from './components/CategoryOverview';
import Team from './components/Team';
import Associates from './components/Associates';
import Impressum from './components/Impressum';
import SettingsScreen from './components/SettingsScreen';

import Changelog from './components/Changelog'

import SettingsPersonalize from './components/SettingsPersonalize';
import HomeScreen from './components/HomeScreen';
import AboutUs from './components/AboutUs';
import Search from './components/Search';


import constants from './constants/constants';
import theme from './constants/theme';

const TabNav = createBottomTabNavigator(
  {
    HomeScreen: {
        screen: HomeScreen,
        path: '/',
        navigationOptions: {
          title: 'home',
          tabBarLabel: 'Startseite',
          tabBarIcon: ({focused }) => (
            <Icon
              name={'home'}
              size={28}
              color={focused ? theme.primary:theme.tabBar.button}
            />
          ),
        },
      },
      EntryListScreen: {
        screen: (props) => <EntryListScreen {...props} screenCategory="all" screenSticky="false"/>,
        path: '/',
        navigationOptions: {
          title: 'category',
          category: "test",
          tabBarLabel: 'Übersicht',
          tabBarIcon: ({focused }) => (
            <Icon
              name={'subject'}
              size={28}
              color={focused ? theme.primary:theme.tabBar.button}
            />
          ),
        },
      },
    CategoryOverview: {
        screen: CategoryOverview,
        path: '/',
        navigationOptions: {
          title: 'category',
          tabBarLabel: 'Kategorien',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'widgets'}
              size={28}
              color={focused ? theme.primary:theme.tabBar.button}
            />
          ),
        },
      },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel:false,
      activeTintColor: theme.primary,
      inactiveTintColor: theme.tabBar.text,
      style: {
        backgroundColor: theme.tabBar.background,
      }
    },
    tabBarComponent: props => (
      <TabBar {...props} />
      ),
  },

);


TabNav.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let title;
  if (routeName === 'HomeScreen') {
    title = 'Butterness';
  } else if (routeName === 'EntryListScreen') {
    title = 'Aritkelübersicht';
  }
  else if (routeName === 'CategoryOverview') {
    title = 'Kategorien';
  }
  else if (routeName === 'AboutUs'){
      title = "Einstellungen";
  }
  else if(routeName === 'OverviewNav'){
    title= "Übersicht";
  }
  else{
    title=routeName;
  }
  return {
    title,
  };
};


const StacksOverTabs = createStackNavigator ({
  Root: {
    screen: TabNav,
    navigationOptions:({ navigation }) => ({
        headerLeft:(
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} accessibilityLabel="Seitliches Menü öffnen">
        <Image
          source={require('./assets/img/IconMenu.png')}
          style={{height:50,width:50}}
         />
         </TouchableOpacity>
        )
    }),
  },
  EntryView: {
    screen: EntryView,
    path: 'article/:slug',
    navigationOptions: {
      //title: 'Eintrag',
    },
  },
    Category: {
    screen: Category,
    path: 'category/:category',
    navigationOptions: {
      //title: 'Kategorien',
    },
  },  
  AboutUs: {
    screen: AboutUs,
    path: 'page/ueber-uns/',
    navigationOptions: {
        title:'Über uns',
    },
  },
  Team: {
    screen: Team,
    path: 'page/team/',
    navigationOptions: {
        title:'Team',
    },
  },
  Associates: {
    screen: Associates,
    path: 'page/partner/',
    navigationOptions: {
      title: 'Partner',
    },
  },
  Impressum: {
    screen: Impressum,
    path: 'page/impressum/',
    navigationOptions: {
      title: 'Impressum',
    }
  },
  Page: {
    screen: Page,
    path: 'page/:slug',
    navigationOptions: {
      //title: 'Seite',
    },
  },
  Changelog: {
    screen: Changelog
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Suche',
    },
  },
  SettingsPersonalize: {
    screen: SettingsPersonalize,
    navigationOptions: {
        title:'Persöhnliche Einstellungen',
    },
  },  
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Einstellungen', 
    },
    
  }
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: theme.header.background,
      color: theme.header.text.primary,
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: theme.header.text.primary,
      fontSize: 18,
      zIndex: 1,
      lineHeight: 23
    },
    headerTintColor: "#fff",
  }
});


const TabsInDrawer = createDrawerNavigator({
    StacksOverTabs: {
      screen: StacksOverTabs,
      path:'',
      navigationOptions: {
        title: 'Butterness App',
      },
    },    
  },
  {
    contentComponent: SideMenu,
    drawerWidth: 240
  }
);


const AppContainer = createAppContainer(TabsInDrawer);

const prefix = constants.baseURL;

const App = () =>
  <View style={{flex: 1}} >
    <StatusBar 
    backgroundColor={theme.primaryVariant}
    barStyle="light-content"
    />
   <AppContainer uriPrefix={prefix}/>
 </View>;

export default App;