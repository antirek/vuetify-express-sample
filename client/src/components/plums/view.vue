<template lang="pug">
  div
    v-card.pa-2
      v-img(
        :src="plum.logoUrl"
        height="200px"
      )
      v-card-title {{ plum.title }}
      v-card-subtitle 1,000 miles of wonder

      v-tabs(
        fixed-tabs 
        background-color='indigo' 
        dark)
        v-tab
          | Info
        v-tab
          | Support Chat

        v-tab
          | Channel


        v-tab-item
          v-card
            v-card-text
              p sfddf
        v-tab-item
          v-card
            v-card-text
              Chat(
                :participants="participants"
                :myself="myself"
                :messages="messages"
                :chat-title="chatTitle"
                :placeholder="placeholder"
                :colors="colors"
                :border-style="borderStyle"
                :hide-close-button="hideCloseButton"
                :close-button-icon-size="closeButtonIconSize"
                :submit-icon-size="submitIconSize"
                :submit-image-icon-size="submitImageIconSize"
                :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null"
                :async-mode="asyncMode"
                :scroll-bottom="scrollBottom"
                :display-header="true"
                :send-images="true"
                :profile-picture-config="profilePictureConfig"
                :timestamp-config="timestampConfig"
                :link-options="linkOptions"
                :accept-image-types="'.png, .jpeg'"
                @onImageClicked="onImageClicked"
                @onImageSelected="onImageSelected"
                @onMessageSubmit="onMessageSubmit"
                @onType="onType"
                @onClose="onClose"
              )

</template>

<script>
import {Item} from 'utils/api';
import { Chat } from 'vue-quick-chat'
import 'vue-quick-chat/dist/vue-quick-chat.css';

export default {
  components: {
    Chat
  },
  name: "PlumView",
  data() {
    return {
        visible: true,
        participants: [
            {
                name: 'Arnaldo',
                id: 1,
                profilePicture: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg'
            },
            {
                name: 'José',
                id: 2,
                profilePicture: 'https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg'
            }
        ],
        myself: {
            name: 'Matheus S.',
            id: 3,
            profilePicture: 'https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg'
        },
        messages: [
            {
                content: 'received messages',
                myself: false,
                participantId: 1,
                timestamp: {year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                type: 'text'
            },
            {
                content: 'sent messages',
                myself: true,
                participantId: 3,
                timestamp: {year: 2019, month: 4, day: 5, hour: 19, minute: 10, second: 3, millisecond: 123},
                type: 'text'
            },
            {
                content: 'other received messages',
                myself: false,
                participantId: 2,
                timestamp: {year: 2019, month: 5, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123},
                type: 'text'
            }
        ],
        chatTitle: 'My chat title',
        placeholder: 'send your message',
        colors: {
            header: {
                bg: '#d30303',
                text: '#fff'
            },
            message: {
                myself: {
                    bg: '#fff',
                    text: '#bdb8b8'
                },
                others: {
                    bg: '#fb4141',
                    text: '#fff'
                },
                messagesDisplay: {
                    bg: '#f7f3f3'
                }
            },
            submitIcon: '#b91010',
            submitImageIcon: '#b91010',
        },
        borderStyle: {
            topLeft: "10px",
            topRight: "10px",
            bottomLeft: "10px",
            bottomRight: "10px",
        },
        hideCloseButton: true,
        submitIconSize: 25,
        closeButtonIconSize: "20px",
        asyncMode: false,
        toLoad: [
            {
                content: 'Hey, John Doe! How are you today?',
                myself: false,
                participantId: 2,
                timestamp: {year: 2011, month: 3, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123},
                uploaded: true,
                viewed: true,
                type: 'text'
            },
            {
                content: "Hey, Adam! I'm feeling really fine this evening.",
                myself: true,
                participantId: 3,
                timestamp: {year: 2010, month: 0, day: 5, hour: 19, minute: 10, second: 3, millisecond: 123},
                uploaded: true,
                viewed: true,
                type: 'text'
            },
        ],
        scrollBottom: {
            messageSent: true,
            messageReceived: false
        },
        displayHeader:true,
        profilePictureConfig: {
            others: true,
            myself: true,
            styles: {
                width: '30px',
                height: '30px',
                borderRadius: '50%'
            }
        },
        timestampConfig: {   
            format: 'HH:mm',
            relative: false
        },
        // there are other options, you can check them here
        // https://soapbox.github.io/linkifyjs/docs/options.html
        linkOptions: {
            myself: {
                className: 'myLinkClass',
                events: {
                    click: function (e) {
                        alert('Link clicked!');
                    },
                    mouseover: function (e) {
                        alert('Link hovered!');
                    }
                },
                format: function (value, type) {
                    if (type === 'url' && value.length > 50) {
                        value = value.slice(0, 50) + '…';
                    }
                    return value;
                }
            },
            others: {
                className: 'othersLinkClass',
                events: {
                    click: function (e) {
                        alert('Link clicked!');
                    },
                    mouseover: function (e) {
                        alert('Link hovered!');
                    }
                },
                format: function (value, type) {
                    if (type === 'url' && value.length > 50) {
                        value = value.slice(0, 50) + '…';
                    }
                    return value;
                }
            }
        },
        plum: null,
    }
  },
  
  watch: {
    $route: "getPlum",
  },
  created: function() {
    this.getPlum();
  },
  methods: {
    getPlum: function() {
      Item.getByShort(this.$route.params.id)
        .then(res => {
          this.plum = res.data;
        });
    }
  }
};
</script>