import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Header,Icon,AirbnbRating} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';

export default class HomeScreen extends Component{
  constructor(){
    super()
    this.state={
      movieDetails:{}
    }
  }

timeConvert(num){
  var hours=Math.floor(num/60)
  var minutes=num%60
  return `${hours}hrs${minutes}mins`
}

componentDidMount(){
  this.getMovie()
}

getMovie=()=>{
  const url='http://localhost:5000/get-movie';
  axios.get(url).then(response=>{
    let details=response.data.data;
    details['duration']=this.timeConvert(details.duration)
    this.setState({movieDetails:details})

  })
  .catch(e=>{
    console.log(e.message)
  })
}

likedMovie=()=>{
  const url='http://localhost:5000/liked-movie';
  axios.post(url).then(response=>{
    this.getMovie()
  })
  .catch(e=>{
    console.log(e.message)
  })
  
}
unlikedMovie=()=>{
  const url='http://localhost:5000/unliked-movie';
  axios.post(url).then(response=>{
    this.getMovie()
  })
  .catch(e=>{
    console.log(e.message)
  })
}
notWatchedMovie=()=>{
  const url='http://localhost:5000/not-watched-movie';
  axios.post(url).then(response=>{
    this.getMovie()
  })
  .catch(e=>{
    console.log(e.message)
  })
}

render(){
  const {movieDetails}=this.state;
  if(movieDetails.poster_link){
    const {
      poster_link,title,release_date,duration,overview,rating
    }=movieDetails
    return(
      <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Header centerComponent={{text:'Movie Recommended',style:styles.headerTitle}}
      rightComponent={{icon:'search',color:'blue'}}
      backgroundColor={'yellow'}
      containerStyle={{flex:1}}/>   
      </View>
      <View style={styles.subContainer}>
          <View style={styles.subTopContainer}>
              <Image style={styles.posterImage} source={{uri:poster_link}}/>
              </View>
              <View style={styles.subBottomContainer}>
                  <View style={styles.upperBottomContainer}>
                      <Text style={styles.title}>{title}</Text>
                      <Text style={styles.subTitle}>{`${release_date.split('-')[0]} | ${duration}`}</Text>
              </View>
              <View style={styles.middleBottomContainer}>
                  <View style={{flex:0.3}}>
                      <AirbnbRating count={10} reviews={['','','','','']}
                      defaultRating={raiting}
                      isDisabled={true}
                      size={RFValue(25)}
                      starContainerStyle={{marginTop:-30}}/>
                  </View>

                  <View style={{flex:0.7,padding:15}}>
                    <Text style={styles.overview}>{overview}</Text>  
                    </View> 
                    </View>
                    <View style={styles.LowerBottemContainer}>
                      <View style={styles.IconButtonContainer}>
                        <TouchableOpacity onPress={this.likedMovie}>
                          <Icon reverse name={'check'} size={RFValue(30)} color={'orange'}/>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={this.unlikedMovie}>
                          <Icon reverse name={'cross'} size={RFValue(30)} color={'red'}/>
                          </TouchableOpacity>
                          </View>
                          <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={this.notWatchedMovie}>
                              <Text style={styles.buttonText}>Did not watch</Text>
                              </TouchableOpacity>
                              </View>
                              </View>
                              </View>
                              </View>
                              </View>

     )
  }
  return(null)
}
}

const Styles=StyleSheet.create({
  Container:{
    flex:1,
    backgroundColor:'white',
  },
  HeaderContainer:{
    flex:0.1,
  },
  HeaderTitle:{
    color:'white',
    fontWeight:'bold',
    fontSize:RFValue(18)
  },
  SubContainer:{
    flex:0.9
  },
  subTopContainer:{
    flex:0.4,
    justifyContent:'center',
    alignItems:'center'
  },
  posterImage:{
    width:'60%',
    height:'90%',
    resizeMode:'stretch',
    boderValue:RFValue(30),
    marginHorizontal:RFValue(10)
  },
  subBottomContainer:{
    flex:0.6
  },
  upperBottomContainer:{
    flex:0.2,
    alignItems:'center',
  },
  title:{
    fontSize:RFValue(20),
    fontWeight:'bold',
    textAlign:'center'
  },
  subTitle:{
    fontSize:RFValue(14),
    fontWeight:'300'
  },
  middleBottomContainer:{
    flex:0.35
  },
  overview:{
    fontSize:RFValue(30),
    textAlign:'center',
    fontWeight:'300',
    color:'lightblue'
  },
  LowerBottemContainer:{
    flex:0.45
  },
  IconButtonContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  buttonContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:RFValue(160),
    height:RFValue(50),
    borderRadius:RFValue(20),
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    marginTop:RFValue(15)
  },
  buttonText:{
    fontSize:RFValue(15),
    fontWeight:'bold'
  }
})