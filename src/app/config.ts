export const config = {
  personal_assistant: {
    apiCredentials: {
      sessionId: '864fd3e8-9544-c273-4417-7d90f2a1c6be',
      serverUrl: 'https://breeze.accion.rocks/aic-bot',
      //serverUrl: 'http://localhost:8766',
      dialogFlowUrl: 'https://api.dialogflow.com/v1/query?v=20150910',
      clientAccessToken: 'af92f5c059244bd397135aabf95f44dc',
      session_id: '864fd3e8-9544-c273-4417-7d90f2a1c6be'
    },
    initial_messages: ['Greetings! How can I assist? \n You can start off by asking me questions about Accion Employees, Presentations & Projects.'],
    customisation: {
      widget_launcher_icon: {
        color: '#009aff',
        open: 'message',
        close: 'close'
      },
      widget_window: {
        header_background: '#009aff',
        header_title: 'Personal Assistant',
        header_icon: 'mode_comment'
      }
    },
    chat_icon: {
      bot: {
        name: 'Alexa',
        thread: 'tAlexa',
        image: '../../../assets/bot.svg'
      },
      user: {
        name: 'Alexa',
        thread: 'tAlexa',
        image: '../../../assets/user.svg'
      }
    }
  }
};
