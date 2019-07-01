import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'

import Video from 'react-native-video'

import { TouchableOpacity, Button, Link, IconButton, Icon } from 'App/Components'

import { Metrics } from 'App/Themes'

import { onVideoEnd, onVideoError, onVideoToggle, getImageSize, componentDidMount, componentWillMount } from 'App/Modules'

import s from './Styles'

export default class Card extends Component {
  static propTypes = {
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    video: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    title: PropTypes.string,
    text: PropTypes.string,
    button: PropTypes.string,
    loading: PropTypes.bool,
    link: PropTypes.string,
    textAlign: PropTypes.string,
    onPress: PropTypes.func,
    onLinkPress: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      paused: true,
      imageWidth: 0,
      imageHeight: 0
    }
  }

  componentDidMount () {
    componentDidMount(this)
  }

  componentWillUnmount () {
    componentWillMount(this)
  }

  getImageSize (imageUri) {
    getImageSize(imageUri)
  }

  onVideoToggle = () => {
    onVideoToggle(this)
  }

  onVideoEnd = () => {
    onVideoEnd(this)
  }

  onVideoError = (e) => {
    onVideoError(e)
  }

  render () {
    const {
      style = {},
      image,
      video,
      title,
      text,
      button,
      loading = false,
      link,
      textAlign = 'center',
      onPress = () => {},
      onLinkPress = () => {}
    } = this.props

    const { paused, imageWidth, imageHeight } = this.state
    const imageStyle = (imageWidth > 0)
      ? {width: imageWidth, height: imageHeight}
      : undefined

    return (
      <View style={style.view}>
        {image && (
          <View style={s.imageView}>
            <Image style={imageStyle} source={image} />
          </View>
        )}
        {!image && video && (
          <TouchableOpacity style={s.videoView} onPress={this.onVideoToggle}>
            {paused && (
              <IconButton
                style={{button: StyleSheet.flatten(s.videoButton)}}
                onPress={this.onVideoToggle}>
                <Icon
                  name='play'
                  size={24}
                  style={{marginLeft: 4}} />
              </IconButton>
            )}
            <Video
              ref={(ref) => { this.player = ref }}
              paused={paused}
              source={video}
              resizeMode='cover'
              ignoreSilentSwitch={'ignore'}
              progressUpdateInterval={100.0}
              onEnd={this.onVideoEnd}
              onError={this.onVideoError}
              style={s.videoPlayer} />
          </TouchableOpacity>
        )}
        {title && (
          <View style={[s.titleView, (textAlign === 'center') ? s.centered : s.titleView_padded, style.titleView]}>
            <Text style={[s.text, (textAlign === 'center') ? s.text_center : null]}>{title}</Text>
          </View>
        )}
        {text && (
          <View style={[s.textView, (textAlign === 'center') ? s.centered : s.textView_padded, style.textView]}>
            <Text style={[s.text, (textAlign === 'center') ? s.text_center : null]}>{text}</Text>
          </View>
        )}
        {button && (
          <Button style={[s.centered, style.buttonView]} loading={loading} text={button} onPress={onPress} />
        )}
        {link && (
          <Link
            style={{view: (button) ? {marginTop: Metrics.unit} : null, text: StyleSheet.flatten(s.link)}}
            text={link}
            centered uppercase={false}
            onPress={onLinkPress} />
        )}
      </View>
    )
  }
}
