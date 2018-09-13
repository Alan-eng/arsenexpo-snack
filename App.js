import React, { Component } from 'react';
import { Image, Modal, TouchableHighlight } from 'react-native';
import {
  Root,
  Container, 
  Header, 
  View, 
  DeckSwiper, 
  Card, 
  CardItem, 
  Thumbnail, 
  Text, 
  Left, 
  Right,
  Body, 
  Icon,
  Toast, 
  Button} from 'native-base';

const cards = [
  {
    text: [
      '- Девушка, можно с вами познакомиться?', 
      '- Я лесбиянка.'
    ],
    name: 'One',
    image: require('./img/pickUpCircle.jpg'),
  },
  {
    text: 'Card Two',
    name: 'One',
    image: require('./img/pickUpCircle.jpg'),
  },
  {
    text: 'Card One',
    name: 'One',
    image: require('./img/girl.svg'),
  },
];
export default class DeckSwiperAdvancedExample extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      answerIsGood: false
    }
    this.modalOpenHandler = this.modalOpenHandler.bind(this)
  }

  modalOpenHandler(answer) {
    this.setState({
      modalOpen: true,
      answerIsGood: answer.isGood
    })
    setTimeout(() => this.setState({modalOpen: false}),1000)
  }

  render() {
    return (
      <Root>
      <Container>
        <Header />

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalOpen}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
            >
            <View style={{
              width: '100%',
              flex: 1,
              alignItems: 'center',
              position: 'absolute',
            }}>
              <Image
                style={{
                  flex: 1,
                  width: 200,
                  height: 200,
                }}
                source={ this.state.answerIsGood ? 
                require('./img/pickUpMaster-min.png') :
                require('./img/okayFace-min.png')
                } 
              />
              <Text>Modal text view</Text>
              <Text>!!!!!!------!!!!!</Text>
            </View>
          </Modal>
        
        <View>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={cards}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                <Text>Over</Text>
              </View>}
            renderItem={item =>
              <Card style={{ elevation: 4 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Right>
                    <Thumbnail source={item.image} />
                  </Right>
                  <Text>ответ девушки</Text>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 200, flex: 1 }} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
              onSwipeRight ={() => {
              this.modalOpenHandler({isGood: true});
              Toast.show({
                text: "Wrong password!",
                buttonText: "Okay",
                duration: 3000
              })
              }}
              onSwipeLeft ={() => {
              this.modalOpenHandler({isGood: false});
              Toast.show({
                text: "Good!",
                buttonText: "Okay",
                duration: 3000
              })
              }}
          />
        </View>
      </Container>
        
      </Root>
    );
  }
}