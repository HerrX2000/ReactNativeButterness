import theme from '../../constants/themeBright'

export default {
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: theme.primary,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
  navContainer: {
    backgroundColor: '#E6E6E6'
  },
  
  navItemText: {
    padding: 10,
    fontSize: 20,
    color: '#1a1a1a'
  },
  navSection: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  sectionHeadingStyle: {
    backgroundColor: '#df691a',
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    alignItems:'center',
    backgroundColor: '#d6d7da',
  },
  footerVersion: {
    padding: 16,
    alignItems:'center',
    backgroundColor: '#c9cbcf',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '200',
    color: '#666666',
  },
  footerImage:{
    margin:10,
    height:66,
    width:80
  },
};
